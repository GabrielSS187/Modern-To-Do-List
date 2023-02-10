import { apiBase } from "../services/apiBase";

import { TGetAllTodosResponse, TAddTodo } from "./types";

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

export const addTodoApi = async ({ todo }: TAddTodo) => {
  const res = await apiBase.post("/todo/create", {
    todo,
  });
  return res;
};