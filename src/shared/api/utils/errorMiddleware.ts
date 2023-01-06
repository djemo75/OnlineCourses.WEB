import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const errorMiddleware = (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  return res.status(500).send({ error: "There was an error", details: err });
};

export { errorMiddleware };
