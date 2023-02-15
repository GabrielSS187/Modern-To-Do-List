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

// src/useCases/userCases/validations.ts
var validations_exports = {};
__export(validations_exports, {
  registerRequestSchema: () => registerRequestSchema,
  signInRequestSchema: () => signInRequestSchema
});
module.exports = __toCommonJS(validations_exports);
var import_zod = require("zod");
var registerRequestSchema = import_zod.z.object({
  userName: (0, import_zod.string)().trim().regex(/^\S+\s*$/, { message: "Username cannot contain spaces." }).min(4, { message: "Username at least 4 characters." }).max(20, { message: "Maximum character username is 20." }),
  password: (0, import_zod.string)().trim().regex(/^\S+\s*$/, { message: "Password cannot contain spaces." }).min(6, { message: "Password minimum characters is 6." }).max(8, { message: "Maximum password of characters is 8." })
});
var signInRequestSchema = import_zod.z.object({
  userName: (0, import_zod.string)().trim(),
  password: (0, import_zod.string)().trim()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerRequestSchema,
  signInRequestSchema
});
