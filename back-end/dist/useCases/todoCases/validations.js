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

// src/useCases/todoCases/validations.ts
var validations_exports = {};
__export(validations_exports, {
  createRequestSchema: () => createRequestSchema
});
module.exports = __toCommonJS(validations_exports);
var import_zod = require("zod");
var createRequestSchema = import_zod.z.object({
  todo: (0, import_zod.string)().trim().min(4, { message: "Todo the minimum number of characters is 4." }).max(30, { message: "Todo the maximum number of characters and 30." })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRequestSchema
});
