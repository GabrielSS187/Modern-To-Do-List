import { apiBase } from "../services/apiBase";

import { TUSer, TFindUser, TSignInResponse } from "./types";

export const register =  async ({ userName, password }: TUSer) => {
  await apiBase.post("/user/register", {
    userName,
    password
  })
};

export const signIn =  async ({ userName, password }: TUSer) => {
  const res = await apiBase.post<TSignInResponse>("/user/signIn", {
    userName,
    password
  });

  return res;
};

export const getUserByToken = async () => {
  try {
    const { data } = await apiBase.get("/user/token");
    return data;
  } catch (err: any) {
    console.log(err);
  };
};