import { z } from "zod";

import { ITodoRepository } from "../../models/todoModel/interfaces";
import { TodoErrors } from "../../errors/TodoErrors";
import { 
  TCreateRequest, 
  createRequestSchema, 
  TUpdateStatusRequest,
  TDeleteRequest,
  TGetAllTodos
} from "./validations";

export class TodoCases {
  constructor(
    private todoRepository: ITodoRepository
  ){};

  async create (idUser: number, request: TCreateRequest) {
    const validationRequest = createRequestSchema
    .parseAsync(request);

    try {
     await validationRequest
    } catch (error) {
      const zodError = error as z.ZodError;
      const validationErrors: Record<string, string> = {};
      
      zodError.errors.forEach((error) => {
        if ( !error.path ) return;
        validationErrors[error.path[0]] = error.message
      });

      throw new TodoErrors(validationErrors, 400);
    };

    const { todo } = await validationRequest;

    await this.todoRepository.create({
      todo,
      idUser
    });

    return;
  };

  async delete (request: TDeleteRequest) {
    const { idUser, idTodo, selectTypeDeleteAll } =  request;

    if ( !idTodo && !selectTypeDeleteAll ) {
      throw new TodoErrors(
        { error: "choose one of these options query: idTodo or selectType" }, 
        406
      );
    };

    if ( idTodo ) {
      const todo = await this.todoRepository.findTodo(idTodo); 
      if ( !todo || todo.id_user !== idUser ) {
        throw new TodoErrors({error: "Todo not found."}, 404);
      };
    };

    const verifyTypeSelectDeleteAll =
    selectTypeDeleteAll && 
    selectTypeDeleteAll !== "deleteAllComplete" 
    && selectTypeDeleteAll !== "deleteAllIncomplete"
    if ( verifyTypeSelectDeleteAll ) {
      throw new TodoErrors(
        {error: "To delete all todos choose one of the types: deleteAllComplete or deleteAllIncomplete"}, 
        406
      );
    };

    await this.todoRepository.delete({
      idUser,
      idTodo,
      selectTypeDeleteAll
    });

    return;
  };

  async updateStatus (idUser: number, request: TUpdateStatusRequest) {
    const { idTodo, status } = request;
    
    const todo = await this.todoRepository
    .findTodo(idTodo);

    if (!todo || todo.id_user !== idUser) {
      throw new TodoErrors({error: "Todo not found."}, 404);
    };
    
    if (String(status) !== "true" && String(status) !== "false") {
      throw new TodoErrors({error: "Status is only allowed: true or false."}, 406);
    };

    const transformBoolean =
    Boolean(String(status) === "true" ? true : false);

    await this.todoRepository.updateStatus({
      idTodo,
      status: transformBoolean,
    });

    return;
  };

  async getAllTodos (request: TGetAllTodos) {
    const { idUser, typeList } = request;

    if ( typeList !== "complete" && typeList !== "incomplete" ){
      throw new TodoErrors(
        {error: "Type of valid lists: complete or incomplete."}, 
        406
      );
    };

    if ( typeList === "complete" ){
      const todos = await this.todoRepository
      .getAllTodosComplete(idUser);
      
      return todos;
    };

    if ( typeList === "incomplete" ){
      const todos = await this.todoRepository
      .getAllTodosIncomplete(idUser);
      
      return todos;
    };

    return;
  };
};