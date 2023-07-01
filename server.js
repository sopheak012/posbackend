require("dotenv").config();

const cors = require("cors");
const express = require("express");
const orderRoutes = require("./routes/orders");
const mongoose = require("mongoose");

//express app
const app = express();

//constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/orders", orderRoutes);
