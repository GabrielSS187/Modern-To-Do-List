export class CustomError extends Error {
  constructor(
    public message: string | any, public statusCode: number){
      super(message)
  };
};