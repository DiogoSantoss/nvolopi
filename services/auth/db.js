import mongoose from "mongoose";

function connect(uri) {
  // Connecting to the database
  mongoose
    .connect(uri, {
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
