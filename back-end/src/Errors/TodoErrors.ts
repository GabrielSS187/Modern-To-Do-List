import { CustomError } from "./CustomError";

export class TodoErrors extends CustomError {
  constructor(
    public error: Record<string, string>,
    public statusCode: number
  ){
    super(error, statusCode);
  };
};