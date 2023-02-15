import { CustomError } from "./CustomError";

export class ErrorUser extends CustomError {
  constructor(
    public error: Record<string, string> | any,
    public statusCode: number
  ){
    super(error, statusCode);
  };
};
