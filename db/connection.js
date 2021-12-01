const mongoose = require("mongoose");

const connectToDb = async (app) => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to the database: ${connection.connection.host}`);
    app.emit("ready");
  } catch (err) {
    console.log("Could not connect to the database");
    console.log(err);
  }
};

module.exports = connectToDb;
