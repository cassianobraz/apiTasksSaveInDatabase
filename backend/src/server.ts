import express from "express";
import { routes } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
