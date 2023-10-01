import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

export default {
  "User": mongoose.model("user", userSchema),
}
