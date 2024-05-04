import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { ILoginFormValues } from "../models/login-form";
import { useAuth } from "../../use-auth";

import { LoginRequest } from "../../models/login";
import { HttpError } from "../../../../utils/http-errors";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

interface SignInProviderProps {
  children: ReactNode;
}

export interface SignInFormProps {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  handleOpen: () => void;
  handleClose: () => void;
  handleSelectCondition: (value: boolean) => void;
  handlePolicyClose: () => void;
  handlePolicyOpen: () => void;
  handleOpenErrorModal: () => void;
  handleCloseErrorModal: () => void;
  handleSelectPolicyCondition: (value: boolean) => void;
  verifyRequiredError: (value: string, name: keyof ILoginFormValues) => void;
  setSavedProfile: (value: boolean) => void;
  savedProfile: boolean;
  openTerms: boolean;
  openPolicy: boolean;
  openErrorModal: boolean;
  control: Control<ILoginFormValues, any>;
  errors: FieldErrors<ILoginFormValues>;
  signInError: string;
}

const SignInFormContext = createContext({} as SignInFormProps);

export const SignInFormProvider: React.FC<SignInProviderProps> = ({
  children,
}) => {
  const schema = yup.object().shape({
    email: yup.string().required("Esse campo é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(32, "A senha deve ter até 32 caracteres")
      .required("Esse campo é obrigatório"),
    saveProfile: yup.boolean(),
  });

  const [openTerms, setOpenTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);

  const [sendingForm, setSendingForm] = useState(false);

  const [openErrorModal, setOpenErrorModal] = useState(false);

  const [signInError, setSignInError] = useState("");
  const navigate = useNavigate();

  const { signIn, } = useAuth();

  const handleClose = () => {
    setOpenTerms(false);
  };

  const handleOpen = () => {
    setOpenTerms(true);
  };

  const handleSelectCondition = () => {
    handleClose();
  };

  const handlePolicyClose = () => {
    setOpenPolicy(false);
  };

  const handlePolicyOpen = () => {
    setOpenPolicy(true);
  };

  const handleSelectPolicyCondition = () => {
    handlePolicyClose();
  };

  const handleOpenErrorModal = () => {
    setOpenErrorModal(false);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(true);
  };

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ILoginFormValues>({ resolver: yupResolver(schema) });

  const saveProfileData = async (email: string, password: string) => {
    secureLocalStorage.setItem("@challenge:userEmail", email);
    secureLocalStorage.setItem("@challenge:userPassword", password);
    secureLocalStorage.setItem("@challenge:saveLogin", true);
  };

  const loadProfileData = async () => {
    const saveLogin = secureLocalStorage.getItem("@challenge:saveLogin");
    if (saveLogin) {
      reset({
        email: secureLocalStorage.getItem("@challenge:userEmail") as string,
        password: secureLocalStorage.getItem(
          "@challenge:userPassword"
        ) as string,
        saveProfile: true,
      });
      setSavedProfile(true);
    }
  };

  const flushCredentials = async () => {
    secureLocalStorage.removeItem("@challenge:userEmail");
    secureLocalStorage.removeItem("@challenge:userPassword");
    secureLocalStorage.removeItem("@challenge:saveLogin");
  };

  const handleAuthorize = useCallback(
    async ({ email, password }: LoginRequest): Promise<any> => {
      try {
        const newAuthState = await signIn({ email, password });
        if (getValues("saveProfile")) {
          await saveProfileData(email, password);
        } else {
          flushCredentials();
        }
        navigate("/dashboard");
        return newAuthState;
      } catch (error) {
        console.log('ERROR', error)
        if (error === HttpError.unauthorized) {
          setSignInError("Credenciais inválidas");
        }
        toast(`${error}`, { type: "error", autoClose: 1500 });

      }
    },
    []
  );

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        setSendingForm(true);
        await handleAuthorize({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setSendingForm(false);
      }
    },
    (invalid) => {
      console.log("INVALID", invalid);
    }
  );

  const verifyRequiredError = (value: string, name: keyof ILoginFormValues) => {
    if (!value || value.length === 0) {
      setError(name, { message: "Esse campo é obrigatório" });
    } else {
      clearErrors(name);
    }
  };

  useEffect(() => {
    const initForm = async () => {
      await loadProfileData();
    };
    initForm();
  }, []);

  return (
    <SignInFormContext.Provider
      value={{
        control,
        errors,
        openPolicy,
        openTerms,
        openErrorModal,
        signInError,
        savedProfile,
        setSavedProfile,
        verifyRequiredError,
        handleOpen,
        handleClose,
        handlePolicyOpen,
        handlePolicyClose,
        handleSelectCondition,
        handleSelectPolicyCondition,
        onSubmit,
        handleOpenErrorModal,
        handleCloseErrorModal,
      }}
    >
      {children}
    </SignInFormContext.Provider>
  );
};

export const useSignInForm = (): SignInFormProps => {
  const context = useContext(SignInFormContext);
  return context;
};
