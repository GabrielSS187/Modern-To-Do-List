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

// src/repositories/TodoRepository.ts
var TodoRepository_exports = {};
__export(TodoRepository_exports, {
  TodoRepository: () => TodoRepository
});
module.exports = __toCommonJS(TodoRepository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TodoRepository
});
