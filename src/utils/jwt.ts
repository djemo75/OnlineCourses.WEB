import JSONWebToken from "jsonwebtoken";
import moment from "moment";

export const decodeToken = (jwt: string) =>
  JSONWebToken.decode(jwt) as JSONWebToken.JwtPayload;

export const shouldRefreshToken = (expiresIn: number) => {
  // if expires is > less than 15 mins in the future
  const expiresSoon = moment().isAfter(
    moment(expiresIn * 1000).subtract(15, "minutes")
  );
  if (expiresSoon) {
    return true;
  }

  return false;
};

export const shouldRelogAgain = (expiresIn: number) => {
  return moment().isAfter(moment(expiresIn * 1000));
};
