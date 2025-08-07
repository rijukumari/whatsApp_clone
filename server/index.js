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

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Static file serving for image/file access
app.use("/file", express.static(path.join(__dirname, "uploads")));

// ✅ Main routes
app.use("/", router);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello");
});

// ✅ Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
