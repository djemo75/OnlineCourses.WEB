import { errorMiddleware } from "./errorMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { Options as NextConnectOptions } from "next-connect";

const baseHandler = (
  options?: NextConnectOptions<NextApiRequest, NextApiResponse<any>>
) => {
  return nextConnect({ onError: errorMiddleware, ...options });
};

export { baseHandler };
