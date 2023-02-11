import { apiBase } from "../services/apiBase";

import { 
  TGetAllTodosResponse, 
  TAddTodo, 
  TUpdateStatusTodoParams
 } from "./types";

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

export const updateStatusTodoApi = async ({
  idTodo,
  status
}: TUpdateStatusTodoParams) => {
  await apiBase.put(`/todo/update-status/${idTodo}/${status}`);
};

export const deleteTodoApi = async (idTodo: number) => {
  await apiBase.delete(`/todo/delete?todoId=${idTodo}`);
};

export const deleteAllTodosIncompleteApi = async () => {
  await apiBase.delete("/todo/delete?selectType=deleteAllIncomplete");
};

export const deleteAllTodosCompleteApi = async () => {
  await apiBase.delete("/todo/delete?selectType=deleteAllComplete");
};