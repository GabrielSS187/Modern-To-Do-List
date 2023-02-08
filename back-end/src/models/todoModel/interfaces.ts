import { 
  TTodo, 
  TGetAllTodos, 
  TDeleteTodos, 
  TUpdateStatus,
} from "./types";

export interface ITodoRepository {
  create: (data: TTodo) => Promise<void>;
  delete: (params: TDeleteTodos) => Promise<void>;
  updateStatus: (params: TUpdateStatus) => Promise<void>;
  findTodo: (idTodo: number) => Promise<TGetAllTodos>;
  getAllTodosComplete: (idUser: number) => Promise<TGetAllTodos[]>;
  getAllTodosIncomplete: (idUser: number) => Promise<TGetAllTodos[]>;
};