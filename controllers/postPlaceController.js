import { v4 as uuidv4 } from "uuid";
import { Post } from "../models/Post.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      return res.status(204).json({
        message: "No posts available",
      });
    }
    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
const createPost = async (req, res) => {
  try {
    const {
      name,
      location,
      country,
      continent,
      is_open_to_public,
      details,
      author,
    } = req.body;
    if (!name || !location || !country || !continent || !author) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const newPost = {
      name,
      location,
      country,
      continent,
      is_open_to_public,
      details,
      author,
      uuid: uuidv4(),
    };
    const post = new Post(newPost);
    await post.save();
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const {
      name,
      location,
      country,
      continent,
      is_open_to_public,
      details,
      author,
    } = req.body;
    if (!name || !location || !country || !continent || !author) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const updatedPost = {
      name,
      location,
      country,
      continent,
      is_open_to_public,
      details,
      author,
    };
    const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
