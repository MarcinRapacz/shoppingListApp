import express from "express";

interface HandleErrorInterface {
  msg: string;
  statusCode: number;
  content?: any[];
}

/**
 * Throw error.
 * @param  msg String
 * @param  statusCode Nubmer
 */
export default (data: HandleErrorInterface): HandleErrorInterface => {
  throw {
    msg: data.msg,
    statusCode: data.statusCode,
    data: data.content,
  };
};

export const handleError = (
  err: HandleErrorInterface,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(err.statusCode).json({ message: err.msg, content: err.content });
};
