import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("todo", (table) => {
    table.increments("id_todo").primary(),
    table.string("todo", 50).notNullable(),
    table.integer("id_user").unsigned().notNullable(),
    table.foreign("id_user")
    .references("user.id_user")
    .onDelete("CASCADE"),
    table.dateTime("created_at", { useTz: false }).defaultTo(knex.fn.now(0))
  });
};

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("todo");
};