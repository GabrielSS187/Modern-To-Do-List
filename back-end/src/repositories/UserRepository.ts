import { Database } from "../data/Database";
import { IUserRepository } from "../models/userModel/interfaces";
import { TUSer, TFindUserParams } from "../models/userModel/types";

export class UserRepository extends Database
implements IUserRepository {
  #tableName = "user";

  async create ({
    user_name,
    password,
  }: TUSer) {
    await Database.connection(this.#tableName).insert({
      user_name,
      password_hash: password,
    });
  };

  async findUser ({ idUser, userName }: TFindUserParams) {
    if ( userName ) {
      const [ foundUser ] = await Database.connection(this.#tableName)
      .select("id_user", "user_name", "password_hash")
      .where("user_name", userName);
      return foundUser;
    };

    const [ foundUser ] = await Database.connection(this.#tableName)
    .select("id_user", "user_name", "password_hash")
    .where("id_user", idUser);
    return foundUser;
  };
};