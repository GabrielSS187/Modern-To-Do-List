import { Router } from "express";

import { TodoControllers } from "../controllers/TodoControllers";

export const todoRoutes = Router();

const todoControllers = new TodoControllers();

todoRoutes.get("/get-all/:typeList", todoControllers.getAllTodos);

todoRoutes.post("/create", todoControllers.create);

todoRoutes.put("/update-status/:idTodo/:status", todoControllers.updateStatus);

todoRoutes.delete("/delete", todoControllers.delete);