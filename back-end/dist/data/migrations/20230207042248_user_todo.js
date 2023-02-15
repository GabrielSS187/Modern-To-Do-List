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

// src/data/migrations/20230207042248_user_todo.ts
var user_todo_exports = {};
__export(user_todo_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(user_todo_exports);
async function up(knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id_user").primary(), table.string("user_name", 50).notNullable().unique(), table.string("password_hash", 255).notNullable(), table.dateTime("created_at", { useTz: false }).defaultTo(knex.fn.now(0)), table.dateTime("updated_at", { useTz: false }).defaultTo(knex.fn.now(0));
  }).createTable("todo", (table) => {
    table.increments("id_todo").primary(), table.string("todo", 50).notNullable(), table.boolean("status").notNullable(), table.integer("id_user").unsigned().notNullable(), table.foreign("id_user").references("user.id_user").onDelete("CASCADE"), table.dateTime("created_at", { useTz: false }).defaultTo(knex.fn.now(0));
  });
}
async function down(knex) {
  return knex.schema.dropTable("user").dropTable("todo");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
