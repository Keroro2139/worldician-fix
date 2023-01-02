import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext } from "react";
import { useImmer } from "use-immer";

import { GetCurrentUserService } from "../services/user.service/get-current-user";
import { CookieUtil } from "../utils/cookie.util";

export type User = {
  id: string;
  createdAt: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
  updatedAt: string;
};

export interface AuthState {
  isAuth: boolean;
  profile: User | null;
}

export interface AuthStateContext extends AuthState {
  onLogin: (username: string, password: string) => Promise<string | undefined>;
  onLogout: () => Promise<void>;
  getCurrentUser: () => void;
}

const INITIAL_STATE: AuthState = {
  isAuth: false,
  profile: null,
};

export const AuthContext = createContext<AuthStateContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [state, setState] = useImmer<AuthState>(INITIAL_STATE);

  const getCurrentUser = async () => {
    const getCurrentUser = new GetCurrentUserService();
    const user = await getCurrentUser.request();
    setState((draft) => {
      draft.profile = user;
    });
  };

  const onLogin = async (username: string, password: string) => {
    try {
      const cookie = new CookieUtil();
      cookie.setAccessToken("YJc9U1xDjfDKoJagtqO3");

      await getCurrentUser();

      setState((draft) => {
        draft.isAuth = true;
      });

      router.push(`/worlds`, `/worlds`, { locale: i18n.language });
    } catch (error: any) {
      if (error.isAxiosError) {
        return error.response.data.message;
      }
      return error.message;
    }
  };

  const onLogout = async () => {
    const cookie = new CookieUtil();
    cookie.removeAccessToken();

    window.location.href = `/${i18n.language}/login`;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        onLogin,
        onLogout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthStateContext;
