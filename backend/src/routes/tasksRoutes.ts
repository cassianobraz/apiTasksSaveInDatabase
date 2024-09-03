import { Router } from "express";
import { TasksController } from "../controller/TasksController";

export const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.post("/", tasksController.create);
tasksRoutes.get("/", tasksController.index);
tasksRoutes.put("/:id", tasksController.update);
tasksRoutes.delete("/:id", tasksController.delete);
tasksRoutes.patch("/:id/complete", tasksController.completeTask);
