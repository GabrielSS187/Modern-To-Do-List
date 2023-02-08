import { Database } from "../data/Database";
import { ITodoRepository } from "../models/todoModel/interfaces";
import { TDeleteTodos, TGetAllTodos, TTodo, TUpdateStatus } from "../models/todoModel/types";

export class TodoRepository extends Database
implements ITodoRepository {
  #tableName = {
    todo: "todo",
    user: "user",
  };

  async create ({ todo, idUser }: TTodo) {
    await Database.connection(this.#tableName.todo)
    .insert({
      todo,
      status: false,
      id_user: idUser,
    });
  };

  async delete ({idUser, idTodo, selectTypeDeleteAll }: TDeleteTodos) {
    if ( idUser && selectTypeDeleteAll === "deleteAllComplete" ) {
      await Database.connection(this.#tableName.todo)
      .delete()
      .where("id_user", idUser)
      .where("status", true);
    };

    if ( idUser && selectTypeDeleteAll === "deleteAllIncomplete" ) {
      await Database.connection(this.#tableName.todo)
      .delete()
      .where("id_user", idUser)
      .where("status", false);
    };

    if ( idUser && idTodo ) {
      await Database.connection(this.#tableName.todo)
      .delete()
      .where("id_user", idUser)
      .where("id_todo", idTodo);
    };
  };

  async updateStatus ({ idTodo, status }: TUpdateStatus) {
    await Database.connection(this.#tableName.todo)
    .update("status", status)
    .where("id_todo", idTodo);
  };

  async findTodo (idTodo: number) {
    const [ todo ] = await Database.connection(this.#tableName.todo)
    .select("id_todo", "todo", "status", "id_user")
    .where("id_todo", idTodo);

    return todo;
  };

  async getAllTodosComplete (idUser: number) {
    const todos = await Database.connection(`${this.#tableName.user} as U`)
    .select("T.id_todo", "T.todo", "T.status")
    .innerJoin(`${this.#tableName.todo} as T`, `U.id_user`, "T.id_user")
    .where("U.id_user", idUser)
    .where("T.status", true)
    .orderBy("T.created_at", "desc");
    
    return todos;
  };

  async getAllTodosIncomplete (idUser: number) {
    const todos = await Database.connection(`${this.#tableName.user} as U`)
    .select("T.id_todo", "T.todo", "T.status")
    .innerJoin(`${this.#tableName.todo} as T`, "U.id_user", "T.id_user")
    .where("U.id_user", idUser)
    .where("T.status", false)
    .orderBy("T.created_at", "desc");
    
    return todos;
  };
};
