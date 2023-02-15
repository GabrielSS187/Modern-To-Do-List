"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/server.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));
var app = (0, import_express.default)();
import_dotenv.default.config();
app.use(import_express.default.json());
app.use((0, import_cors.default)());
var PORT = 8e3;
var server = app.listen(process.env.PORT || PORT, () => {
  if (server) {
    const address = server.address();
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
  ;
});

// src/index.ts
var import_express_async_errors = require("express-async-errors");

// src/errors/CustomError.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(JSON.stringify(message));
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/routes/userRoutes.ts
var import_express2 = require("express");

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

// src/routes/userRoutes.ts
var userRoutes = (0, import_express2.Router)();
var userControllers = new UserControllers();
userRoutes.get("/token", userControllers.getUserByToken);
userRoutes.post("/register", userControllers.register).post("/signIn", userControllers.signIn);

// src/routes/todoRoutes.ts
var import_express3 = require("express");

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

// src/errors/TodoErrors.ts
var TodoErrors = class extends CustomError {
  constructor(error, statusCode) {
    super(error, statusCode);
    this.error = error;
    this.statusCode = statusCode;
  }
};

// src/useCases/todoCases/validations.ts
var import_zod2 = require("zod");
var createRequestSchema = import_zod2.z.object({
  todo: (0, import_zod2.string)().trim().min(4, { message: "Todo the minimum number of characters is 4." }).max(30, { message: "Todo the maximum number of characters and 30." })
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

// src/routes/todoRoutes.ts
var todoRoutes = (0, import_express3.Router)();
var todoControllers = new TodoControllers();
todoRoutes.get("/get-all/:typeList", todoControllers.getAllTodos);
todoRoutes.post("/create", todoControllers.create);
todoRoutes.put("/update-status/:idTodo/:status", todoControllers.updateStatus);
todoRoutes.delete("/delete", todoControllers.delete);

// src/middlewares/authMiddleware.ts
var jwt2 = new JwtAdapter();
var authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    throw new Error("Token is required.");
  const token = authorization.replace("Bearer", "").trim();
  try {
    const decoded = jwt2.getTokenData({ token });
    const { id } = decoded;
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
  ;
};

// src/index.ts
app.use("/user", userRoutes);
app.use("/todo", authMiddleware, todoRoutes);
app.use((error, req, res, next) => {
  return error instanceof CustomError ? res.status(error.statusCode).send(error.message) : res.status(500).send(error.message || error.pgMessage);
});
