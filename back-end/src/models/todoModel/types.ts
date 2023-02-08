export type TTodo = {
  todo: string;
  idUser: number;
};

export type TGetAllTodos = {
  id_todo: number;
  todo: string;
  status: boolean;
  id_user: number;
};

export type TDeleteTodos = {
  idUser: number;
  //* Deletar apenas 1.
  idTodo?: number;
  selectTypeDeleteAll?: "deleteAllComplete" | "deleteAllIncomplete";
};

export type TUpdateStatus = {
  idTodo: number;
  status: boolean;
};