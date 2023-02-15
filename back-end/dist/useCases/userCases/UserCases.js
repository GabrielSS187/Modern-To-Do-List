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

// src/useCases/userCases/UserCases.ts
var UserCases_exports = {};
__export(UserCases_exports, {
  UserCases: () => UserCases
});
module.exports = __toCommonJS(UserCases_exports);

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
  constructor(userRepository, bcryptAdapter, jwtAdapter) {
    this.userRepository = userRepository;
    this.bcryptAdapter = bcryptAdapter;
    this.jwtAdapter = jwtAdapter;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserCases
});
