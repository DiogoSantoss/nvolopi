import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import { User } from "./models.js";
import db from "./db.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PRIV_KEY = fs.readFileSync(process.env.AUTH_PRIV_KEY);
const JWT_EXPIRATION = 30 * 60 * 1000;
const port = process.env.PORT;

db.connect(MONGO_URI);

const app = express();
app.use(cors()); // for local development
app.use(bodyParser.json());

/**
 * Create a new user in the database.
 * Parameters:
 * - email
 * - password
 */
app.post("/create", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

/**
 * Login user and generate new JWT token.
 * Parameters:
 * - email
 * - password
 */
app.post("/auth", async (req, res) => {
  // assume request is correct, might be problematic
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
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
      res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// TODO: should be sent on login
// set as an http only cookie
// maybe store it in the DB
app.post("/refresh", (req, res) => {
  res.send({ token: "token" });
});

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}...`);
});
