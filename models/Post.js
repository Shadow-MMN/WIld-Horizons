import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  is_open_to_public: {
    type: Boolean,
    required: true,
    immutable: true,
    default: false,
  },
  details: [
    {
      fun_fact: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  author: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Post = mongoose.model("Post", postSchema);
