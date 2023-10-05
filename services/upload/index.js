import express from "express";
import http from "http";
import multer from "multer";
import bodyParser from "body-parser";
import { Authenticator, Authorizator } from "nvolopi-common";

const app = express();
const server = http.createServer(app);
const authenticator = Authenticator("<url>");
const authorizator = Authorizator("<url>");
const SIZE_LIMIT = 5 << 30;
const port = "3000";

app.use(bodyParser.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: SIZE_LIMIT,
  },
});

app.post("/upload", authenticator, authorizator, (req, res) => {
  // need to check if user is authenticated
  // if file exists
  // if all allowed exist ( maybe not )
  // store metadata about file in DB
  const { filename, user, allowed } = req.body;
  res.status(200).send({
    filename,
    user,
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

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
