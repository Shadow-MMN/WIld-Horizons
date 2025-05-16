import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
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
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Place = mongoose.model("Place", placeSchema);
