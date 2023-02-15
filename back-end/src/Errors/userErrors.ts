import { CustomError } from "./CustomError";

export class UserErrors extends CustomError {
  constructor(
    public error: Record<string, string>,
    public statusCode: number
  ){
    super(error, statusCode);
  };
};
