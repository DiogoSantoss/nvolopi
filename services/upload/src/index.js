import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import { File } from "./models.js";
import db from "./db.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SIZE_LIMIT = 5 << 20;
const AUTH_PUBLIC_KEY = fs.readFileSync(process.env.AUTH_PUBLIC_KEY);
const PORT = process.env.UPLOAD_PORT_NUMBER;

const app = express();
app.use(cors()); // for local development
app.use(bodyParser.json());

db.connect(MONGO_URI);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: SIZE_LIMIT,
  },
});

// Authentication middleware
const checkAuth = async (req, res, next) => {
  const auth = req.headers["authentication"];
  const token = auth && auth.split(" ")[1];

  if (token == undefined) {
    res.status(400).send({ error: "No token provided" });
    return;
  }

  const result = jwt.verify(token, AUTH_PUBLIC_KEY, { algorithms: ["RS256"] });

  if (result.expiresAt < new Date().getTime()) {
    res.status(400).send({ error: "Token expired" });
    return;
  }

  // TODO: Maybe check if user exists in DB and if token is valid

  req.user = result.user;

  next();
};

app.use(checkAuth);

app.post("/download", async (req, res) => {
  const fileID = req.body.fileID;

  try {
    const file = await File.findOne({ id: fileID });
    res.status(200).send({ file: file.file, name: file.name });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "File not found" });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  // need to check if user is authenticated
  // if file exists
  // if all allowed exist ( maybe not )
  // store metadata about file in DB

  const file = req.file;
  let allowed = [req.user];

  if (req.body.allowed) {
    allowed += [req.body.allowed];
  }
  
  try {
    const _file = await File.create({
      id: crypto.randomUUID(),
      name: file.originalname,
      file: file.buffer,
      allowedUsers: [req.body.allowed, req.user],
    });
    res.status(200).send({
      fileID: _file.id
    });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Upload service listening on port ${PORT}...`);
});
