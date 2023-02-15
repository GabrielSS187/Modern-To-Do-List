import { CustomError } from "./CustomError";

export class ErrorTodo extends CustomError {
  constructor(
    public error: Record<string, string>,
    public statusCode: number
  ){
    super(JSON.stringify(error), statusCode);
  };
};