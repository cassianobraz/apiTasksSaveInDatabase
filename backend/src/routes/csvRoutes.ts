import { Router } from "express";
import { CsvController } from "../controller/CsvController";

export const csvRoutes = Router();
const csvController = new CsvController();

csvRoutes.post("/form-data", csvController.exportTasksToCsv);
