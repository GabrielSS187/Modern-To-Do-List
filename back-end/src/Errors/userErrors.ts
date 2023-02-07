import { CustomError } from "./CustomError";

export class ErrorUserAlreadyExists extends CustomError {
  constructor(
    public message: string,
    public statusCode: number
  ){
    super(message, statusCode);
  };
};