import { CustomError } from "./customError";

export class ErrorUser extends CustomError {
  constructor(
    public error: Record<string, string>,
    public statusCode: number
  ){
    super(error, statusCode);
  };
};
