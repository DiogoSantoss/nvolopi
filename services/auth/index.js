import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "./models";
import db from "./db";

dotenv.config();
db.connect();

const port = process.env.PORT;
const PRIV_KEY = process.env.PRIV_KEY;
const JWT_EXPIRATION = 30 * 60 * 1000;

const app = express();
app.use(bodyParser.json());

app.post("/create", async (req, res) => {
  // assume request is correct, might be problematic
  const { email, password } = req.body;
  bcrypt
    .hash(password)
    .then(async (hashedPwd) => {
      // always try to create user
      // if email already in DB throw error
      User.create({
        email,
        password: hashedPwd,
      })
        .then(() => {
          res.status(200).send();
        })
        .catch((err) => {
          res.status(400).send({ error: err });
        });
    })
    .catch((err) => res.status(400).send({ error: err }));
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
