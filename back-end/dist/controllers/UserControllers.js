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

// src/controllers/UserControllers.ts
var UserControllers_exports = {};
__export(UserControllers_exports, {
  UserControllers: () => UserControllers
});
module.exports = __toCommonJS(UserControllers_exports);

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

// src/repositories/UserRepository.ts
var UserRepository = class extends Database {
  #tableName = "user";
  async create({
    user_name,
    password
  }) {
    await Database.connection(this.#tableName).insert({
      user_name,
      password_hash: password
    });
  }
  async findUser({ idUser, userName }) {
    if (userName) {
      const [foundUser2] = await Database.connection(this.#tableName).select("id_user", "user_name", "password_hash").where("user_name", userName);
      return foundUser2;
    }
    ;
    const [foundUser] = await Database.connection(this.#tableName).select("id_user", "user_name", "password_hash").where("id_user", idUser);
    return foundUser;
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

// src/errors/UserErrors.ts
var UserErrors = class extends CustomError {
  constructor(error, statusCode) {
    super(error, statusCode);
    this.error = error;
    this.statusCode = statusCode;
  }
};

// src/useCases/userCases/validations.ts
var import_zod = require("zod");
var registerRequestSchema = import_zod.z.object({
  userName: (0, import_zod.string)().trim().regex(/^\S+\s*$/, { message: "Username cannot contain spaces." }).min(4, { message: "Username at least 4 characters." }).max(20, { message: "Maximum character username is 20." }),
  password: (0, import_zod.string)().trim().regex(/^\S+\s*$/, { message: "Password cannot contain spaces." }).min(6, { message: "Password minimum characters is 6." }).max(8, { message: "Maximum password of characters is 8." })
});
var signInRequestSchema = import_zod.z.object({
  userName: (0, import_zod.string)().trim(),
  password: (0, import_zod.string)().trim()
});

// src/useCases/userCases/UserCases.ts
var UserCases = class {
  constructor(userRepository2, bcryptAdapter2, jwtAdapter2) {
    this.userRepository = userRepository2;
    this.bcryptAdapter = bcryptAdapter2;
    this.jwtAdapter = jwtAdapter2;
  }
  async register(request) {
    const validationRequest = registerRequestSchema.parseAsync(request);
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
      throw new UserErrors(validationErrors, 400);
    }
    ;
    const { userName, password } = await validationRequest;
    const user = await this.userRepository.findUser({ userName });
    if (user) {
      throw new UserErrors({ error: "A user with that name already exists." }, 409);
    }
    ;
    const passwordHash = await this.bcryptAdapter.hashEncrypt({ password });
    await this.userRepository.create({
      user_name: userName,
      password: passwordHash
    });
    return {
      userName,
      password
    };
  }
  async signIn(request) {
    const validationRequest = signInRequestSchema.parseAsync(request);
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
      throw new UserErrors(validationErrors, 400);
    }
    ;
    const { userName, password } = await validationRequest;
    const user = await this.userRepository.findUser({ userName });
    if (!user) {
      throw new UserErrors({ error: "Username does not exist." }, 404);
    }
    ;
    const decryptPassword = await this.bcryptAdapter.compareHash({
      password,
      passwordDatabase: user.password_hash
    });
    if (!decryptPassword) {
      throw new UserErrors({ error: "Invalid password." }, 406);
    }
    ;
    const generateToken = this.jwtAdapter.generateToken({
      id: user.id_user
    });
    return {
      userName: user.user_name,
      token: generateToken
    };
  }
  async getUserByToken(token) {
    if (!token) {
      throw new UserErrors({ error: "The token is required." }, 406);
    }
    ;
    const decryptJwt = this.jwtAdapter.getTokenData({
      token
    });
    const user = await this.userRepository.findUser({
      idUser: decryptJwt.id
    });
    if (!user) {
      throw new UserErrors({ error: "Invalid token." }, 401);
    }
    ;
    return user;
  }
};

// src/adapters/BcryptAdapter/BcryptAdapter.ts
var bcrypt = __toESM(require("bcryptjs"));
var import_process2 = require("process");
var BCryptAdapter = class {
  async hashEncrypt({ password }) {
    const rounds = Number(import_process2.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(password, salt);
    return result;
  }
  async compareHash({ password, passwordDatabase }) {
    const result = await bcrypt.compare(password, passwordDatabase);
    return result;
  }
};

// src/adapters/JwtAdapter/JwtAdapter.ts
var import_process3 = require("process");
var jwt = __toESM(require("jsonwebtoken"));
var JwtAdapter = class {
  generateToken({ id }) {
    const expiresIn = 1647456e3;
    const token = jwt.sign(
      {
        id
      },
      import_process3.env.JWT_KEY,
      {
        expiresIn
      }
    );
    return token;
  }
  getTokenData({ token }) {
    const payload = jwt.verify(token, import_process3.env.JWT_KEY);
    const result = {
      id: payload.id
    };
    return result;
  }
};

// src/controllers/UserControllers.ts
var userRepository = new UserRepository();
var bcryptAdapter = new BCryptAdapter();
var jwtAdapter = new JwtAdapter();
var userCases = new UserCases(
  userRepository,
  bcryptAdapter,
  jwtAdapter
);
var UserControllers = class {
  async register(req, res) {
    const { userName, password } = req.body;
    const result = await userCases.register({
      userName,
      password
    });
    return res.status(201).json(result);
  }
  async signIn(req, res) {
    const { userName, password } = req.body;
    const result = await userCases.signIn({
      userName,
      password
    });
    return res.status(200).json(result);
  }
  async getUserByToken(req, res) {
    const token = req.headers.authorization;
    const result = await userCases.getUserByToken(token);
    return res.status(200).json(result);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserControllers
});
