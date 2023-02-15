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

// src/errors/TodoErrors.ts
var TodoErrors_exports = {};
__export(TodoErrors_exports, {
  TodoErrors: () => TodoErrors
});
module.exports = __toCommonJS(TodoErrors_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TodoErrors
});
