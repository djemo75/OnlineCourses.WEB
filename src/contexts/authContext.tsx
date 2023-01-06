import { UserData } from "@src/shared/api/types/userData";
import {
  fetchProfile,
  googleLogin,
  logoutUser,
  refreshToken,
} from "@src/shared/api/services/auth";
import ScreenLoading from "@src/shared/components/ScreenLoading";
import { axiosSetup } from "@src/utils/axios";
import { shouldRefreshToken, shouldRelogAgain } from "@src/utils/jwt";
import { useRouter } from "next/router";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { ROUTES } from "@src/constants/routes";
import { browser } from "process";

type AuthState = {
  userId: number | null;
  userData: UserData | null;
  userDataLoading: boolean;
  loginLoading: boolean;
};

type AuthContext = {
  redirectToGoogleLogin: () => void;
  logout: () => void;
  getProfile: () => Promise<void>;
} & AuthState;

const initialValues = {
  userId: null,
  loginLoading: false,
  userData: null,
  userDataLoading: true,
};

export const AuthContext = createContext<AuthContext>(
  initialValues as unknown as AuthContext
);

let interval: NodeJS.Timer;

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [state, setState] = useState<AuthState>(initialValues);

  const handleSetState = (key: string, value: any) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  useEffect(() => {
    axiosSetup();

    const userId = localStorage.getItem("userId")
      ? Number(localStorage.getItem("userId"))
      : null;
    setState((prevState) => ({ ...prevState, userId }));

    if (userId) {
      (async () => {
        await checkAccessTokenExpiration();
        await getProfile();
      })();
      interval = setInterval(() => checkAccessTokenExpiration(), 60000);
    } else {
      handleSetState("userDataLoading", false);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    const code = router.query.code as string;
    if (code) {
      googleLoginCallback(code);
    }
  }, [router, router.query]); // eslint-disable-line

  const redirectToGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
    const redirectUri = "http://localhost:3000";
    const scope = "profile email";
    const responseType = "code";
    const state = router.route;
    const url = `${process.env.NEXT_PUBLIC_OAUTH_URL}/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}&access_type=offline&prompt=select_account`;
    location.href = url;
  };

  const googleLoginCallback = async (code: string) => {
    handleSetState("loginLoading", true);
    try {
      const res = await googleLogin(code);
      const { userData, expiresIn } = res.data;
      setState((prevState) => ({
        ...prevState,
        userId: userData.id,
        loginLoading: false,
      }));
      localStorage.setItem("userId", userData.id.toString());
      localStorage.setItem("expiresIn", expiresIn.toString());
      await getProfile();
      router.push(ROUTES.home);
      toast.success("You have successfully logged in");
    } catch (error) {
      handleSetState("loginLoading", false);
      toast.error("Something went wrong with login");
    }
  };

  const checkAccessTokenExpiration = async () => {
    const expiresIn = localStorage.getItem("expiresIn");
    if (!expiresIn) return;

    if (shouldRelogAgain(Number(expiresIn))) {
      await logout(false);
      return;
    }

    if (!shouldRefreshToken(Number(expiresIn))) return;

    try {
      const { data } = await refreshToken();
      localStorage.setItem("expiresIn", data.expiresIn.toString());
    } catch (error) {
      toast.error("Something went wrong with refreshing your session");
      logout(false);
    }
  };

  const getProfile = async () => {
    handleSetState("userDataLoading", true);
    try {
      const res = await fetchProfile();
      handleSetState("userData", res.data.userData);
    } catch (error) {
      toast.error("An error occurred while retrieving user profile");
    }
    handleSetState("userDataLoading", false);
  };

  const logout = async (showToast: boolean = true) => {
    try {
      await logoutUser();
      clearInterval(interval);
      setState((prevState) => ({ ...prevState, userData: null, userId: null }));
      localStorage.removeItem("userId");
      localStorage.removeItem("expiresIn");
      if (showToast) toast.success("You have successfully logged out");
    } catch (error) {
      toast.error("An error occurred while logout");
    }
  };

  const value = {
    ...state,
    redirectToGoogleLogin,
    logout,
    getProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {state.loginLoading || state.userDataLoading ? (
        <ScreenLoading />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContext => useContext(AuthContext);
