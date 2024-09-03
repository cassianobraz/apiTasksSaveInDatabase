import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const updateTaskSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export class TasksController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    try {
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
        },
      });

      return res.status(201).json(newTask);
    } catch (error) {
      console.error("Error creating task:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the task." });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany();

      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching tasks." });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
      const parsedId = Number(id);
      if (Number.isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
      }

      const validatedData = updateTaskSchema.safeParse({
        id: parsedId,
        title,
        description,
      });

      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error.errors });
      }

      const dataToUpdate: Record<string, string> = {};
      if (validatedData.data.title) {
        dataToUpdate.title = validatedData.data.title;
      }
      if (validatedData.data.description) {
        dataToUpdate.description = validatedData.data.description;
      }

      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: "No data provided for update." });
      }

      const updatedTask = await prisma.task.update({
        where: { id: parsedId },
        data: dataToUpdate,
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the task." });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const parsedId = Number(id);
      if (Number.isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
      }

      const task = await prisma.task.findUnique({
        where: { id: parsedId },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found." });
      }

      await prisma.task.delete({
        where: { id: parsedId },
      });

      return res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
      console.error("Error deleting task:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the task." });
    }
  }

  async completeTask(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const parsedId = Number(id);
      if (Number.isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
      }

      const task = await prisma.task.findUnique({
        where: { id: parsedId },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found." });
      }

      const updatedTask = await prisma.task.update({
        where: { id: parsedId },
        data: {
          completedAt: task.completedAt ? null : new Date(),
        },
      });

      const message = updatedTask.completedAt
        ? "Task marked as complete."
        : "Task marked as incomplete.";

      return res.status(200).json({ message, task: updatedTask });
    } catch (error) {
      console.error("Error updating task completion status:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the task." });
    }
  }
}
