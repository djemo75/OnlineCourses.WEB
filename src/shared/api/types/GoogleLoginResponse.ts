import { UserData } from "./userData";

export type GoogleLoginResponse = {
  accessToken: string;
  expiresIn: number;
  userData: UserData;
};
