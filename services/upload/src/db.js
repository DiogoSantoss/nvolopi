import mongoose from "mongoose";

const connect = async () => {
  // Connecting to the database
  let done = false
  while(!done)  {
    try {
      await mongoose
        .connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        console.log("Connected");
        done = true
    } catch (error) {
      console.log("Error when connecting to DB");
      console.error(error);
    }
  }
};

const db = {
  connect,
};

export default db;
