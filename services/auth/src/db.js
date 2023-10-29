import mongoose from "mongoose";

const connect = () => {
  // Connecting to the database
  let done = false
  while(!done)  {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected");
        done = true
      })
      .catch((error) => {
        console.log("Error when connecting to DB");
        console.error(error);
      });
  }
};

const db = {
  connect,
};

export default db;
