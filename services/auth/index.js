import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";

import { User } from "./models.js";
import db from "./db.js";

dotenv.config();
db.connect(process.env.MONGO_URI);

const port = process.env.PORT;
const PRIV_KEY = fs.readFileSync(process.env.AUTH_PRIV_KEY);
const JWT_EXPIRATION = 30 * 60 * 1000;

const app = express();
app.use(bodyParser.json());

app.post("/create", async (req, res) => {
  // assume request is correct, might be problematic
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
      })
        .then(() => {
          res.status(200).send();
        })
        .catch((err) => {
          res.status(400).send({ error: err });
        });
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
});

app.post("/auth", async (req, res) => {
  // assume request is correct, might be problematic
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (valid) {
            // generate jwt and send it back to the user
            const expiresAt = new Date();
            expiresAt.setTime(expiresAt.getTime() + JWT_EXPIRATION);
            const token = jwt.sign(
              {
                email: user.email,
                expiresAt: expiresAt.getTime(),
              },
              PRIV_KEY,
              { algorithm: "RS256" }
            );
            res.status(200).send(token);
          } else {
            res.status(400).send({ error: "Authentication" });
          }
        })
        .catch((err) => res.status(400).send({ error: err }));
    })
    .catch((err) => res.status(400).send({ error: err }));
});

// TODO: should be sent on login
// set as an http only cookie
// maybe store it in the DB
app.post("/refresh", (req, res) => {
  console.log(req.body);
  res.send({ token: "token" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
