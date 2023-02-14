import { CustomError } from "./customError";

export class ErrorTodo extends CustomError {
  constructor(
    public error: Record<string, string>,
    public statusCode: number
  ){
    super(error, statusCode);
  };
};