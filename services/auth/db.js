const mongoose = require("mongoose")

const MONGO_URI = 'mongodb://localhost:27017/nvolopi';

exports.connect = () => {
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
};
