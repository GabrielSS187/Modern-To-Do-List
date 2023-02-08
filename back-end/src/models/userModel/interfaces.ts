import { TUSer, TFindUser, TFindUserParams } from "./types";

export interface IUserRepository {
  create: (data: TUSer) => Promise<void>;
  findUser: (params: TFindUserParams) => Promise<TFindUser>;
};