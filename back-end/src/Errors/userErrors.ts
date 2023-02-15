import { CustomError } from "./CustomError";

export class ErrorUser extends CustomError {
  constructor(
    public error: Record<string, string>,
    public statusCode: number
  ){
    super(JSON.stringify(error), statusCode);
  };
};
