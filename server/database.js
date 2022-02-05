const mongoose = require("mongoose");
// const mongoURL = process.env.DATABASE_URL;
const mongoURL = "mongodb://localhost:27017/test";

const startDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.Promise = global.Promise;
    mongoose.set("debug", true);
    const db = await mongoose.connection;

    db.on("error", console.error);
    db.once("open", () => {
      console.log("connect");
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = startDB;
