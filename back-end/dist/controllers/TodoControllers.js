"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/controllers/TodoControllers.ts
var TodoControllers_exports = {};
__export(TodoControllers_exports, {
  TodoControllers: () => TodoControllers
});
module.exports = __toCommonJS(TodoControllers_exports);

// src/data/Database.ts
var import_knex = __toESM(require("knex"));

// src/config/knexfile.ts
var import_process = require("process");
var configKnex = {
  development: {
    client: "pg",
    connection: import_process.env.DATABASE_URL,
    useNullAsDefault: true,
    searchPath: ["knex", "public"],
    migrations: {
      tableName: "knex_migrations_todo",
      extension: "ts"
    },
    seeds: {
      tableName: "knex_seeds_todo",
      extension: "ts"
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  production: {
    client: "pg",
    connection: import_process.env.DATABASE_URL,
    useNullAsDefault: true,
    searchPath: ["knex", "public"],
    migrations: {
      tableName: "knex_migrations_todo",
      extension: "ts"
    },
    seeds: {
      tableName: "knex_seeds_todo",
      extension: "ts"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
var knexfile_default = configKnex;

// src/data/Database.ts
var environment = process.env.NODE_ENV || "development";
var Database = class {
};
__publicField(Database, "connection", (0, import_knex.default)(knexfile_default[environment]));

// src/repositories/TodoRepository.ts
var TodoRepository = class extends Database {
  #tableName = {
    todo: "todo",
    user: "user"
  };
  async create({ todo, idUser }) {
    await Database.connection(this.#tableName.todo).insert({
      todo,
      status: false,
      id_user: idUser
    });
  }
  async delete({ idUser, idTodo, selectTypeDeleteAll }) {
    if (idUser && selectTypeDeleteAll === "deleteAllComplete") {
      await Database.connection(this.#tableName.todo).delete().where("id_user", idUser).where("status", true);
    }
    ;
    if (idUser && selectTypeDeleteAll === "deleteAllIncomplete") {
      await Database.connection(this.#tableName.todo).delete().where("id_user", idUser).where("status", false);
    }
    ;
    if (idUser && idTodo) {
      await Database.connection(this.#tableName.todo).delete().where("id_user", idUser).where("id_todo", idTodo);
    }
    ;
  }
  async updateStatus({ idTodo, status }) {
    await Database.connection(this.#tableName.todo).update("status", status).where("id_todo", idTodo);
  }
  async findTodo(idTodo) {
    const [todo] = await Database.connection(this.#tableName.todo).select("id_todo", "todo", "status", "id_user").where("id_todo", idTodo);
    return todo;
  }
  async getAllTodosComplete(idUser) {
    const todos = await Database.connection(`${this.#tableName.user} as U`).select("T.id_todo", "T.todo", "T.status").innerJoin(`${this.#tableName.todo} as T`, `U.id_user`, "T.id_user").where("U.id_user", idUser).where("T.status", true).orderBy("T.created_at", "desc");
    return todos;
  }
  async getAllTodosIncomplete(idUser) {
    const todos = await Database.connection(`${this.#tableName.user} as U`).select("T.id_todo", "T.todo", "T.status").innerJoin(`${this.#tableName.todo} as T`, "U.id_user", "T.id_user").where("U.id_user", idUser).where("T.status", false).orderBy("T.created_at", "desc");
    return todos;
  }
};

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
  constructor(todoRepository2) {
    this.todoRepository = todoRepository2;
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

// src/controllers/TodoControllers.ts
var todoRepository = new TodoRepository();
var todoCases = new TodoCases(
  todoRepository
);
var TodoControllers = class {
  async create(req, res) {
    const idUser = req.userId;
    const { todo } = req.body;
    await todoCases.create(idUser, {
      todo
    });
    return res.status(201).json({ success: "To-do successfully created." });
  }
  async delete(req, res) {
    const idUser = Number(req.userId), idTodo = req.query.todoId, selectTypeDeleteAll = req.query.selectType;
    await todoCases.delete({
      idUser: Number(idUser),
      idTodo: Number(idTodo),
      selectTypeDeleteAll
    });
    return res.status(200).json({ success: "To-do deleted." });
  }
  async updateStatus(req, res) {
    const idUser = Number(req.userId), idTodo = Number(req.params.idTodo), status = req.params.status;
    await todoCases.updateStatus(idUser, {
      idTodo,
      status
    });
    return res.status(200).json({ success: "Status updated successfully." });
  }
  async getAllTodos(req, res) {
    const idUser = req.userId;
    const typeList = req.params.typeList;
    const result = await todoCases.getAllTodos({
      idUser,
      typeList
    });
    return res.status(200).json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TodoControllers
});
