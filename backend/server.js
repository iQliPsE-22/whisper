const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db");
const User = require("./model");
connectToDb();

app.use(cors());
app.use(express.json());

app.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating User" });
  }
});
app.listen(8080, () => {
  console.log("Server is running on port 5000");
});
