import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BookRoutes from "./routes/BookRoutes.js";
import cors from "cors";
const app = express();
// middleware for parsing request body
app.use(
  cors({
    origin: "https://book-store-frontend-psi-gray.vercel.app/",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on PORT ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("Error", err.message);
  });

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to home page");
});

app.use("/books", BookRoutes);
