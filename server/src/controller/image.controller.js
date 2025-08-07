import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const url = process.env.BASE_URL || "http://localhost:2345";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ error: "file not found" });
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    console.log("Uploaded file path:", imageUrl);

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Upload Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
