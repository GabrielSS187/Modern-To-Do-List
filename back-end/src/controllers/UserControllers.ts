import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserCases } from "../useCases/userCases/UserCases";
import {  BCryptAdapter } from "../adapters/BcryptAdapter/BcryptAdapter";
import { JwtAdapter } from "../adapters/JwtAdapter/JwtAdapter";

type TBody = {
  userName: string;
  password: string;
};

const userRepository = new UserRepository();
const bcryptAdapter = new BCryptAdapter();
const jwtAdapter = new JwtAdapter();
const userCases = new UserCases(
  userRepository,
  bcryptAdapter,
  jwtAdapter
);

export class UserControllers {
  async register (req: Request, res: Response) {
    const { userName, password } = 
    req.body as unknown as TBody;

    const result = await userCases.register({
      userName,
      password
    });

    return res.status(201).json(result);
  };

  async signIn (req: Request, res: Response) {
    const { userName, password } = 
    req.body as unknown as TBody;

    const result = await userCases.signIn({
      userName,
      password,
    });

    return res.status(200).json(result);
  };

  async getUserByToken (req: Request, res: Response) {
    const token = req.headers.authorization as string;

    const result = await userCases.getUserByToken(token);

    return res.status(200).json(result);
  };
};