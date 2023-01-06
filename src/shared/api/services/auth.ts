import axios from "axios";
import { GetProfileResponse } from "../types/GetProfileResponse";
import { GoogleLoginResponse } from "../types/GoogleLoginResponse";
import { GoogleRefreshTokenResponse } from "../types/GoogleRefreshTokenResponse";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const googleLogin = async (code: string) => {
  return axios.post<GoogleLoginResponse>(`${API_URL}/api/auth/google/login`, {
    code,
  });
};

export const refreshToken = async () => {
  return axios.post<GoogleRefreshTokenResponse>(
    `${API_URL}/api/auth/google/refresh-token`
  );
};

export const fetchProfile = async () => {
  return axios.get<GetProfileResponse>(`${API_URL}/api/auth/profile`);
};

export const logoutUser = async () => {
  return axios.post<Boolean>(`${API_URL}/api/auth/google/logout`);
};
