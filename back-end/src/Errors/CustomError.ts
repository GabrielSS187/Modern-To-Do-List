export class CustomError extends Error {
  constructor(
    public message: Record<string, string> | any, public statusCode: number){
      super(JSON.stringify(message))
  };
};