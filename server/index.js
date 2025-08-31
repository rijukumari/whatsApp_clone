import express, { json } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/config/connection.js";
import router from "./src/routes/routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 2346;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";


app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/file", express.static(path.join(__dirname, "uploads")));

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
