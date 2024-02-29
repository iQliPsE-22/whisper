const mongoose = require("mongoose");
async function connectToDb() {
  await mongoose.connect(
    "mongodb+srv://iqlipse22:Uprvmz9ikr@cluster0.xkqjppx.mongodb.net/?retryWrites=true&w=majority/admin",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  console.log("Database connected");
}

module.exports = connectToDb;
