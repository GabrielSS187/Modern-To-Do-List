import { apiBase } from "../services/apiBase";

import { TGetAllTodosResponse } from "./types";

export const getAllTodosCompleteApi = async () => {
  const { data } = await 
  apiBase.get<TGetAllTodosResponse[]>("/todo/get-all/complete");
  return data;
};

export const getAllTodosIncompleteApi = async () => {
  const { data } = await 
  apiBase.get<TGetAllTodosResponse[]>("/todo/get-all/incomplete");
  return data;
};