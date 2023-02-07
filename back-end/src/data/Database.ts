import knex from "knex";
import knexConfig from "../config/knexfile";

const environment = process.env.NODE_ENV || "development";

export class Database {
 protected static connection = knex(knexConfig[environment]);
};