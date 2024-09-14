import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: `User already exist, you can login`, success: false });
    }
    const UserModel = new userModel({ name, email, password });
    UserModel.password = await bcrypt.hash(password, 10);
    await UserModel.save();
    res.status(201).json({ message: "Signup Successfully ", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const errMsg = "Auth failed, Email or Password is incorrect";
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const isPassEqual = bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login Success ",
      name: user.name,
      email,
      jwtToken,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
