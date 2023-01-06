import { IncomingHttpHeaders } from "http";
import { NextApiRequest } from "next";

export const extractAccessToken = (req: NextApiRequest) => {
  return (
    extractAccessTokenFromCookies(req.cookies) ||
    extractAccessTokenFromHeaders(req.headers)
  );
};

export const extractAccessTokenFromCookies = (
  cookies: Partial<{
    [key: string]: string;
  }>
) => {
  if (!cookies) {
    return "";
  }

  return cookies.accessToken;
};

export const extractAccessTokenFromHeaders = (headers: IncomingHttpHeaders) => {
  if (!headers.authorization) {
    return "";
  }
  const [, accessToken] = headers.authorization.split(" ");
  return accessToken;
};
