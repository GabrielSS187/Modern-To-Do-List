import { Request, Response, NextFunction } from "express";
import { app } from "./server";
import "express-async-errors";

import { userRoutes } from "./routes/userRoutes";
import { CustomError } from "./Errors/CustomError";


app.use("/user", userRoutes);

//* Errors ============================================================
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    return error instanceof CustomError 
  ?
    res.status(error.statusCode).send(error.message)
  :
    res.status(500).send(error.message || error.pgMessage)
});