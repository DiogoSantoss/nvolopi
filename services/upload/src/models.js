import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  file: { type: Buffer, required: true },
  allowedEmails: { type: [String], required: true },
});

const File = mongoose.model("file", fileSchema);

export { File };
