import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import authSvc from "../services/auth.service.tsx";
import {
  getFromLocalstorage,
  notify,
  NotifyType,
  setLocalStorage,
} from "../utilities/helpers";
import { WebStorageConstant } from "../config/constants";

import { Spin } from "antd";

export interface ICredentials {
  email: string;
  password: string;
}

export interface IAuthProviderProps {
  children: any;
}

export interface IUserData {
  address: string;
  createdAt: Date;
  email: string;
  image: {
    url: string;
    optimizedUrl: string;
  };
  name: string;
  phone: string;
  role: string;
  status: string;
  _id: string;
}
export const AuthContext = createContext({
  login: async (credentials: ICredentials) => {},
  forgetPasswordReq: async (_data: { email: string }): Promise<void> => {},
  loggedInUser: {} as IUserData,
  setLoggedInUser: (_user: IUserData) => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<IUserData>();

  const getLoggedInUser = async () => {
    try {
      const userInfo = await authSvc.getRequest("/auth/me");
      setLoggedInUser(userInfo?.result.data);

      return userInfo?.result.data;
    } catch (exception) {
      console.error("Error:", exception);
    }
  };

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

      return await getLoggedInUser();
    } catch (exception: any) {
      notify(exception.response.message, NotifyType.ERROR);
      throw exception;
    }
  };

  const forgetPasswordReq = async (data: { email: string }) => {
    try {
      const response = await authSvc.postRequest("/auth/forget-password", data);
      notify(response.result.message, NotifyType.SUCCESS);
    } catch (exception) {
      notify(
        "Error sending forget password request ! Please try again later",
        NotifyType.ERROR
      );
    }
  };

  useEffect(() => {
    const token = getFromLocalstorage(WebStorageConstant.ACCESS_TOKEN);
    if (token) {
      getLoggedInUser();
    }
  }, []);

  return (
    <>
      <Suspense fallback={<Spin fullscreen></Spin>}>
        <AuthContext.Provider
          value={{
            login: loginFunc,
            forgetPasswordReq,
            loggedInUser: loggedInUser as IUserData,
            setLoggedInUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      </Suspense>
    </>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
