/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";

import secureLocalStorage from "react-secure-storage";
import api from "../../services/api";

import { LoginRequest } from "./models/login";
import { Session } from "./models/session";
import { StorageToken } from "./models/storage-token";
import { toast } from "react-toastify";
import { authMessages } from "../../utils/auth-messages";
import { HttpErrorMessage } from "../../models/http/http-error-message";
import { fetchUserData } from "../../services/user/user.service";
import { Axios, AxiosError } from "axios";

interface AuthContextData {
  user: any;
  token: string;
  session: Session;
  clearToken: () => void;
  signIn: ({ email, password }: LoginRequest) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: any, newToken: string) => void;
  handleAuthErrors: (httpError: string) => string;
  handleValidationError: () => void;
  loadUserData: () => Promise<void>;
  loadFromStorageUser: () => Promise<void>;
  updateToken: ({ access_token, refresh_token }: StorageToken) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setUser] = useState<any>({});
  const [token, setToken] = useState("");
  const [session, setSession] = useState({} as Session);

  const updateToken = useCallback(
    async ({ access_token, refresh_token }: StorageToken) => {
      secureLocalStorage.setItem("@challe:token", access_token);
      secureLocalStorage.setItem("@challe:refreshToken", refresh_token);
      setToken(access_token);
    },
    []
  );

  const signIn = useCallback(
    async ({ email, password }: LoginRequest) => {
      try {
        console.log("EMAIL", email);
        const { data } = await api.post("/auth/login", { email, password });
        console.log("DATA", data);
        updateToken({
          access_token: data.token,
          refresh_token: data.refreshToken,
        });
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        setSession(data);
        return data;
      } catch (err) {
        console.log("ERROR");
        if(err instanceof AxiosError) {
          if (err.response?.status === 404 || err.response?.status === 400) {
            throw new Error("Usuário ou senha inválidos");
          }
          else if(err.message === '"Network Error"') {
             throw new Error("Erro de conexão com a rede");
          } else {
            throw new Error("Erro ao realizar login");
          }
        }
        throw new Error("Erro ao realizar login");
      }
    },
    [updateToken]
  );

  const handleValidationError = useCallback(() => {
    return null;
  }, []);

  const updateUser = useCallback((user: any) => {
    setUser(user);
    setToken(user.token);
  }, []);

  const handleAuthErrors = useCallback((httpError: string) => {
    let message: string = null as unknown as string;
    for (const key in authMessages) {
      if (key === JSON.parse(httpError)) {
        message = authMessages[key as keyof HttpErrorMessage];
      }
    }
    toast(`${message}`, { type: "error", autoClose: 500 });

    return message ?? httpError;
  }, []);

  const loadUserData = useCallback(async () => {
    const user = await fetchUserData();
    setUser({ ...user, token });
  }, [token]);

  const loadFromStorageUser = useCallback(async () => {
    const storageToken = (await secureLocalStorage.getItem(
      "@challe:token"
    )) as string;
    if (storageToken) {
      const { exp } = jwtDecode<JwtPayload>(storageToken);
      if (exp && Date.now() >= exp * 1000) {
        secureLocalStorage.removeItem("@challe:token");
        setToken("");
        return;
      }
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;
      setToken(storageToken);
    }
  }, []);

  const clearToken = useCallback(async () => {
    setToken("");
    secureLocalStorage.removeItem("@challe:token");
    secureLocalStorage.removeItem("@challe:refreshToken");
  }, []);

  const signOut = useCallback(async () => {
    try {
      await clearToken();
    } catch (error) {
      throw new Error("Erro ao realizar logout");
    }
  }, []);

  useEffect(() => {
    loadFromStorageUser();
  }, [loadFromStorageUser]);

  return (
    <AuthContext.Provider
      value={{
        clearToken,
        signIn,
        signOut,
        updateUser,
        updateToken,
        handleAuthErrors,
        handleValidationError,
        loadUserData,
        loadFromStorageUser,
        user: currentUser,
        token,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
