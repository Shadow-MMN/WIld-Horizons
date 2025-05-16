import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "User creation failed",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userCredientials = username || email;
  try {
    const userDoc = await User.findOne({
      $or: [{ username: userCredientials }, { email: userCredientials }],
    });
    if (!userDoc)
      return res.status(404).json({ message: "Invalid credentials" });
    const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid logon credentials. Please correct and retry",
      });
    }
    const token = jwt.sign(
      { username: userDoc.username, userId: userDoc._id },
      secret,
      { expiresIn: "1h" }
    );
    res
      .cookie("access_token", token)
      .json({ message: "Login successful", user: token.username });
  } catch (error) {
    res.status(401).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("access_token")
    .json({ message: "User logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
