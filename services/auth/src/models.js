import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model("user", userSchema);

export {
  User,
};
