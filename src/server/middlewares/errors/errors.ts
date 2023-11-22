import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import chalk from "chalk";
import debugCreator from "debug";
const debug = debugCreator("robots:middleware:errors");

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError("Endpoint not found", 404);
  next(customError);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const privateMessage = error.customError ?? error.message;
  debug(chalk.red("Error: ", privateMessage));

  res.status(statusCode).json({ error: privateMessage });
};

export default generalError;
