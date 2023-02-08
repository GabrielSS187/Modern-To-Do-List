import { Router } from "express";

import { UserControllers }
 from "../controllers/UserControllers";

export const userRoutes = Router();

const userControllers = new UserControllers();

userRoutes.get("/token", userControllers.getUserByToken);

userRoutes.post("/register", userControllers.register);
userRoutes.post("/signIn", userControllers.signIn);