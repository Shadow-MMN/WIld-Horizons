import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
const authRouter = express.Router();

authRouter
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/logout", logoutUser);

export default authRouter;
