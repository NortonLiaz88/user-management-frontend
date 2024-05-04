/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { UserManagementService } from "../../../services/users/users.service";
import { ICreateUser } from "../../../models/user/user.model";
import { ISelect } from "../../../components/select";

import { UserEntity } from "../../../models/user/user.entity";
import { permissionSelect } from "../utils/permissions-type-select";
import { BaseFormError } from "../../../error/base-form-error";
import { UserStatus } from "../../../enums/user-status";

const userFormService = new UserManagementService();

interface UserFormProviderProps {
  children: ReactNode;
}

export interface UserFormProps {
  getValues: UseFormGetValues<ICreateUser>;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  verifyRequiredError: (value: string, name: keyof ICreateUser) => void;
  setLoading: (value: boolean) => void;
  setValue: UseFormSetValue<ICreateUser>;
  getUser: (value: string) => Promise<void>;
  createUser: (value: ICreateUser) => Promise<void>;
  editUser: (value: ICreateUser) => Promise<void>;
  removeUser: (value: string) => Promise<void>;
  permissions: ISelect[];
  control: Control<ICreateUser, any>;
  errors: FieldErrors<ICreateUser>;
  isValid: boolean;
  loading: boolean;
  sendingForm: boolean;
  user: UserEntity;
  sendSuccess: boolean;
}

const UserFormContext = createContext({} as UserFormProps);

export const UserFormProvider: React.FC<UserFormProviderProps> = ({
  children,
}) => {
  const schema = yup.object().shape({
    id: yup.number().optional(),
    name: yup
      .string()
      .required("Primeiro nome é obrigatório")
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(255, "Nome deve ter no máximo 255 caracteres"),
    lastName: yup
      .string()
      .required("Sobrenome nome é obrigatório")
      .min(3, "Sobrenome deve ter no mínimo 3 caracteres")
      .max(255, "Sobrenome deve ter no máximo 255 caracteres"),
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    username: yup
      .string()
      .required("Nome de usuário é obrigatório")
      .min(3, "Nome de usuário deve ter no mínimo 3 caracteres")
      .max(255, "Nome de usuário deve ter no máximo 255 caracteres"),
    permission: yup.string().required("Permission is required"),
    status: yup.string().required("Status is required"),
    password: yup
      .string()
      .optional()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(255, "Senha deve ter no máximo 255 caracteres"),
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
  } = useForm<ICreateUser>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      status: UserStatus.Active,
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);
  const [user, setUser] = useState<UserEntity>({} as UserEntity);

  const [sendSuccess, setSendSuccess] = useState(false);

  const verifyRequiredError = (value: string, name: keyof ICreateUser) => {
    if (!value || value.length === 0) {
      setError(name, { message: "Esse campo é obrigatório" });
    } else {
      clearErrors(name);
    }
  };

  const getUser = async (value: string) => {
    try {
      const data = await userFormService.getById(value);
      user.id = data.props.id.toString(); // Convert the id to a string
      setUser(data?.props ?? ({} as UserEntity));
      reset({
        name: data?.props?.name,
        lastName: data?.props?.lastName,
        email: data?.props?.email,
        username: data?.props?.username,
        password: data?.props?.password,
        permission: data?.props?.permission,
        status: data?.props?.status,
      });
    } catch (err) {
      const defaultMessage = "Erro ao criar usuário";
      if (err instanceof BaseFormError) {
        toast(`${err?.message}`, { type: "error" });
        return;
      }
      toast(`${defaultMessage}`, { type: "error" });
    } finally {
      setSendingForm(false);
    }
  };

  const createUser = async (value: ICreateUser) => {
    try {
      setSendingForm(true);
      const userForm = new UserEntity({
        ...value,
      });
      await userFormService.create(userForm);
      setSendSuccess(true);
      toast(`Usuário criado com sucesso`, { type: "success" });
      navigate(-1);
    } catch (err) {
      const defaultMessage = "Erro ao criar usuário";
      if (err instanceof BaseFormError) {
        toast(`${err?.message}`, { type: "error" });
        return;
      } else if (err?.message) {
        toast(`${err?.message[0]}`, { type: "error" });
        return;
      }
      toast(`${defaultMessage}`, { type: "error" });
      throw err;
    } finally {
      setSendingForm(false);
    }
  };

  const editUser = async (value: ICreateUser) => {
    try {
      const userForm = new UserEntity({
        ...value,
      });
      if (!user?.id) throw new Error("User ID is required");
      if (!userForm.props?.password) delete userForm?.props?.password;
      await userFormService.update(userForm, user?.id.toString());
      setSendSuccess(true);
      navigate(-1);
      toast(`Usuário editado com sucesso`, { type: "success" });
    } catch (err) {
      const defaultMessage = "Erro ao criar usuário";
      if (err instanceof BaseFormError) {
        toast(`${err?.message}`, { type: "error" });
        return;
      }
      toast(`${defaultMessage}`, { type: "error" });
    } finally {
      setSendingForm(false);
    }
  };

  const removeUser = async (value: string) => {
    try {
      setSendingForm(true);
      await userFormService.delete(value);
      toast(`Usuário removido com sucesso`, { type: "success" });
    } catch (err) {
      const defaultMessage = "Erro ao criar usuário";
      if (err instanceof BaseFormError) {
        toast(`${err?.message}`, { type: "error" });
        return;
      }
      toast(`${defaultMessage}`, { type: "error" });
    } finally {
      setSendingForm(false);
    }
  };

  const onSubmit = handleSubmit(
    async (data) => {
      if (!user?.id) {
        await createUser(data);
      } else {
        await editUser(data);
      }
    },
    (invalid) => {
      console.log("INVALID", invalid);
    }
  );

  return (
    <UserFormContext.Provider
      value={{
        onSubmit,
        verifyRequiredError,
        setLoading,
        getUser,
        createUser,
        editUser,
        removeUser,
        getValues,
        setValue,
        control,
        errors,
        isValid,
        loading,
        sendingForm,
        sendSuccess,
        permissions: permissionSelect,
        user,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};

export const useUserForm = (): UserFormProps => {
  const context = useContext(UserFormContext);
  return context;
};
