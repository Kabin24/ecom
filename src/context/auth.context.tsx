import { createContext, useContext } from "react";
import authSvc from "../services/auth.service.tsx";
import {
  notify,
  NotifyType,
  setCookie,
  setLocalStorage,
} from "../utilities/helpers";
import { WebStorageConstant } from "../config/constants";

export interface ICredentials {
  email: string;
  password: string;
}

export interface IAuthProviderProps {
  children: any;
}
export const AuthContext = createContext({
  login: async (credentials: ICredentials): Promise<void> => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const loginFunc = async (credentials: ICredentials) => {
    try {
      const response = await authSvc.postRequest("/auth/login", credentials);
      console.log(response);

      setLocalStorage(
        WebStorageConstant.ACCESS_TOKEN,
        response.result.data.accessToken
      );
      setLocalStorage(
        WebStorageConstant.REFRESH_TOKEN,
        response.result.data.refreshToken
      );
      setCookie(
        WebStorageConstant.ACCESS_TOKEN,
        response.result.data.accessToken,
        1
      );
      setCookie(
        WebStorageConstant.REFRESH_TOKEN,
        response.result.data.refreshToken,
        1
      );
    } catch (exception: any) {
      notify(exception.response.message, NotifyType.ERROR);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login: loginFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
