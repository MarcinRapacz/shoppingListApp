import express from "express";

interface HandleErrorInterface {
  message: string;
  statusCode: number;
  content?: any[];
}

/**
 * Throw error.
 * @param  message String
 * @param  statusCode Nubmer
 */
export default (data: HandleErrorInterface): HandleErrorInterface => {
  throw {
    message: data.message,
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
  console.log(err);
  res
    .status(err.statusCode)
    .json({ message: err.message, content: err.content });
};
