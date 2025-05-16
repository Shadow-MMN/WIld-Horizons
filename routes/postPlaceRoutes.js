import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postPlaceController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const postPlaceRouter = express.Router();
postPlaceRouter
  .get("/all", getAllPosts)
  .get("/:id", getPostById)
  .post("/", verifyToken, createPost)
  .put("/:id", verifyToken, updatePost)
  .delete("/:id", verifyToken, deletePost);

export default postPlaceRouter;
