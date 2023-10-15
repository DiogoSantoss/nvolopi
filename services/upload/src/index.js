import express from "express";
import http from "http";
import multer from "multer";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

dotenv.config();

const SIZE_LIMIT = 5 << 30;
const AUTH_PUBLIC_KEY = fs.readFileSync(process.env.AUTH_PUBLIC_KEY);
const PORT = process.env.PORT;

const app = express();
app.use(cors()); // for local development
app.use(bodyParser.json());

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
    res.status(400).send();
  }

  const result = jwt.verify(token, AUTH_PUBLIC_KEY, { algorithms: ["ES256"] });

  if (result.expiresAt > new Date().getTime()) {
    res.status(400).send();
  }

  req.user.email = result.email

  next();
}
// app.use(checkAuth);

app.post("/upload", upload.single("file"), (req, res) => {
  // need to check if user is authenticated
  // if file exists
  // if all allowed exist ( maybe not )
  // store metadata about file in DB

  const file = req.file
  console.log(file)
  console.log(file.originalname);
  console.log(file.size);
  console.log(file.allowed)
  /*res.status(200).send({
    filename,
    allowed,
    id: crypto.randomUUID(),
  })*/
});

app.post("/upload/:id", upload.single("file"), (req, res) => {
  // need to check user
  // need to check if metadata for this file exists
  // store bucket url in DB ( or store directly in DB? )

  const base64encoded = reqdd.file.buffer.toString("base64")
  res.status(200).send();
});

app.listen(6969, () => {
  console.log(`Uploade service listening on port ${PORT}...`);
});
