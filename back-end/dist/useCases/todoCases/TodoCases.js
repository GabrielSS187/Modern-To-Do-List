"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useCases/todoCases/TodoCases.ts
var TodoCases_exports = {};
__export(TodoCases_exports, {
  TodoCases: () => TodoCases
});
module.exports = __toCommonJS(TodoCases_exports);

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(JSON.stringify(message));
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/errors/TodoErrors.ts
var TodoErrors = class extends CustomError {
  constructor(error, statusCode) {
    super(error, statusCode);
    this.error = error;
    this.statusCode = statusCode;
  }
};

// src/useCases/todoCases/validations.ts
var import_zod = require("zod");
var createRequestSchema = import_zod.z.object({
  todo: (0, import_zod.string)().trim().min(4, { message: "Todo the minimum number of characters is 4." }).max(30, { message: "Todo the maximum number of characters and 30." })
});

// src/useCases/todoCases/TodoCases.ts
var TodoCases = class {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }
  async create(idUser, request) {
    const validationRequest = createRequestSchema.parseAsync(request);
    try {
      await validationRequest;
    } catch (error) {
      const zodError = error;
      const validationErrors = {};
      zodError.errors.forEach((error2) => {
        if (!error2.path)
          return;
        validationErrors[error2.path[0]] = error2.message;
      });
      throw new TodoErrors(validationErrors, 400);
    }
    ;
    const { todo } = await validationRequest;
    await this.todoRepository.create({
      todo,
      idUser
    });
    return;
  }
  async delete(request) {
    const { idUser, idTodo, selectTypeDeleteAll } = request;
    if (!idTodo && !selectTypeDeleteAll) {
      throw new TodoErrors(
        { error: "choose one of these options query: idTodo or selectType" },
        406
      );
    }
    ;
    if (idTodo) {
      const todo = await this.todoRepository.findTodo(idTodo);
      if (!todo || todo.id_user !== idUser) {
        throw new TodoErrors({ error: "Todo not found." }, 404);
      }
      ;
    }
    ;
    const verifyTypeSelectDeleteAll = selectTypeDeleteAll && selectTypeDeleteAll !== "deleteAllComplete" && selectTypeDeleteAll !== "deleteAllIncomplete";
    if (verifyTypeSelectDeleteAll) {
      throw new TodoErrors(
        { error: "To delete all todos choose one of the types: deleteAllComplete or deleteAllIncomplete" },
        406
      );
    }
    ;
    await this.todoRepository.delete({
      idUser,
      idTodo,
      selectTypeDeleteAll
    });
    return;
  }
  async updateStatus(idUser, request) {
    const { idTodo, status } = request;
    const todo = await this.todoRepository.findTodo(idTodo);
    if (!todo || todo.id_user !== idUser) {
      throw new TodoErrors({ error: "Todo not found." }, 404);
    }
    ;
    if (String(status) !== "true" && String(status) !== "false") {
      throw new TodoErrors({ error: "Status is only allowed: true or false." }, 406);
    }
    ;
    const transformBoolean = Boolean(String(status) === "true" ? true : false);
    await this.todoRepository.updateStatus({
      idTodo,
      status: transformBoolean
    });
    return;
  }
  async getAllTodos(request) {
    const { idUser, typeList } = request;
    if (typeList !== "complete" && typeList !== "incomplete") {
      throw new TodoErrors(
        { error: "Type of valid lists: complete or incomplete." },
        406
      );
    }
    ;
    if (typeList === "complete") {
      const todos = await this.todoRepository.getAllTodosComplete(idUser);
      return todos;
    }
    ;
    if (typeList === "incomplete") {
      const todos = await this.todoRepository.getAllTodosIncomplete(idUser);
      return todos;
    }
    ;
    return;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TodoCases
});
