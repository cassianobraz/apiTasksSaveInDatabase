import * as fs from "node:fs";
import * as path from "node:path";
import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { Parser } from "json2csv";

const prisma = new PrismaClient();

export class CsvController {
  async exportTasksToCsv(req: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany();

      const fields = [
        "id",
        "title",
        "description",
        "createdAt",
        "updatedAt",
        "completedAt",
      ];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(tasks);

      const directoryPath = path.join(__dirname, "../../database");
      const filePath = path.join(directoryPath, "db.csv");

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      fs.writeFileSync(filePath, csv);

      return res
        .status(200)
        .json({ message: "Tasks exported successfully", filePath });
    } catch (error) {
      console.error("Error exporting tasks to CSV:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while exporting tasks to CSV." });
    }
  }
}
