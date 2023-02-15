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

// src/config/knexfile.ts
var knexfile_exports = {};
__export(knexfile_exports, {
  default: () => knexfile_default
});
module.exports = __toCommonJS(knexfile_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
