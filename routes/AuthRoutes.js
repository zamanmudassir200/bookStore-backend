import express from "express";
import { signup, login } from "../controller/authController.js";
import {
  loginValidation,
  signupValidation,
} from "../middlewares/authValidation.js";

const router = express.Router(); // Correct way to create the router

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

export default router; // Use export default instead of module.exports
