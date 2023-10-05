import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

function connect() {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => {
      console.log("Error when connecting to DB");
      console.error(error);
      process.exit(1);
    });
}

const db = {
  connect,
};

export default db;
