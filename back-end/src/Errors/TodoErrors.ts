import { CustomError } from "./CustomError";

export class ErrorTodo extends CustomError {
  constructor(
    public error: Record<string, string> | any,
    public statusCode: number
  ){
    super(error, statusCode);
  };
};