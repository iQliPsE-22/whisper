const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose.connect("mongodb://localhost:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected");
}

module.exports = connectToDb;
