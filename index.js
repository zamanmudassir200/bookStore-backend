import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BookRoutes from "./routes/BookRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRoutes from "./routes/AuthRoutes.js";
const app = express();
dotenv.config();

// CORS Middleware for local development
app.use(
  cors({
    origin: "http://localhost:5173", // Fixed origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Preflight handling
app.options("*", cors());

// Middleware for parsing request body
app.use(express.json());
app.use(bodyParser.json()); // Ensure this is used before routes

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("Database connection error:", err.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

// Routes
app.use("/books", BookRoutes);
app.use("/auth", AuthRoutes);

export default app;
