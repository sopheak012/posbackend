require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");

const { initializeSocket } = require("./sockets/socket");

// Express app
const app = express();

// Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Start the server after successful database connection
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Initialize socket communication
    initializeSocket(server);
  } catch (error) {
    console.log(error);
  }
};

// Connect to the database
connectDB();

// CORS configuration
app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/home", homeRoutes);
