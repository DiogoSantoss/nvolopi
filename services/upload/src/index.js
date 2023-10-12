import express from "express";
import http from "http";
import multer from "multer";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
const server = http.createServer(app);
const SIZE_LIMIT = 5 << 30;
const AUTH_PUBLIC_KEY = fs.readFileSync(process.env.AUTH_PUBLIC_KEY);
const PORT = process.env.PORT;

app.use(bodyParser.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: SIZE_LIMIT,
  },
});

const checkAuth = async (req, res, next) => {
  const auth = req.headers["authentication"];
  const token = auth && auth.split(" ")[1];

  if (token == undefined) {
    res.status(400).send();
  }

  console.log(token)
  const result = jwt.verify(token, AUTH_PUBLIC_KEY, { algorithms: ["ES256"] });

  if (result.expiresAt > new Date().getTime()) {
    res.status(400).send();
  }

  next();
}

app.use(checkAuth);

app.post("/upload", (req, res) => {
  // need to check if user is authenticated
  // if file exists
  // if all allowed exist ( maybe not )
  // store metadata about file in DB
  const { filename, allowed } = req.body;
  res.status(200).send({
    filename,
    allowed,
    id: 23,
  });
});

app.post("/upload/:id", upload.single("file"), (req, res) => {
  // need to check user
  // need to check if metadata for this file exists
  // store bucket url in DB ( or store directly in DB? )
  console.log(req.params.id);
  res.status(200).send();
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
