import { Request, Response } from "express";

import { TodoRepository } from "../repositories/TodoRepository";
import { TodoCases } from "../useCases/todoCases/TodoCases";

const todoRepository = new TodoRepository();
const todoCases = new TodoCases(
  todoRepository
);

export class TodoControllers {
  async create (req: Request, res: Response) {
    const idUser = req.userId as number;
    const { todo } = req.body;

    await todoCases.create(idUser, {
      todo
    });

    return res.status(201).json({success: "To-do successfully created."});
  };

  async delete (req: Request, res: Response) {
    const idUser = Number(req.userId)
    ,idTodo = req.query.todoId
    ,selectTypeDeleteAll = req.query.selectType as any;

    await todoCases.delete({
      idUser: Number(idUser),
      idTodo: Number(idTodo),
      selectTypeDeleteAll
    });

    return res.status(200).json({success: "To-do deleted."})
  };

  async updateStatus (req: Request, res: Response) {
    const idUser = Number(req.userId)
    ,idTodo = Number(req.params.idTodo)
    ,status = req.params.status as unknown as boolean;

    await todoCases.updateStatus(idUser, {
      idTodo,
      status,
    });

    return res.status(200).json({success: "Status updated successfully."});
  };
};