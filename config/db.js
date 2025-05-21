const mongoose = require("mongoose");

//mongodb connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb connected successfully", mongoose.connection.host);
  } catch (error) {
    console.error("Mongodb connection error: ", error);
  }
};

module.exports = connectDb;