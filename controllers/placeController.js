import { Place } from "../models/Place.js";
import { slugToCountry, slugToContinent } from "./searchObjs.js";

const getAllPlaces = async (req, res) => {
  const places = await Place.find();
  res.json(places);
};

const getPlaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getPlaceByContinent = async (req, res) => {
  const raw = req.params.continent.toLowerCase();
  const actualContinent = slugToContinent[raw];

  if (!actualContinent) {
    return res.status(404).json({ error: "Continent not found" });
  }

  const places = await Place.find({
    continent: new RegExp(`^${actualContinent}$`, "i"),
  });

  res.json(places);
};

const getPlaceByCountry = async (req, res) => {
  const raw = req.params.country.toLowerCase();
  const actualCountry = slugToCountry[raw];

  if (!actualCountry) {
    return res.status(404).json({ error: "Country not found" });
  }

  const places = await Place.find({
    country: new RegExp(`^${actualCountry}$`, "i"),
  });

  res.json(places);
};

const getPlaceByQuery = async (req, res) => {
  const { name, location, continent, country, is_open_to_public } = req.query;

  const queryObj = {};

  // Build the MongoDB query object step by step
  if (name) {
    queryObj.name = new RegExp(`^${name}$`, "i"); // exact match, case-insensitive
  }

  if (location) {
    queryObj.location = new RegExp(`^${location}$`, "i");
  }

  if (continent) {
    queryObj.continent = new RegExp(`^${continent}$`, "i");
  }

  if (country) {
    queryObj.country = new RegExp(`^${country}$`, "i");
  }

  if (is_open_to_public !== undefined) {
    try {
      // Parse string "true"/"false" to boolean
      queryObj.is_open_to_public = JSON.parse(is_open_to_public);
    } catch {
      return res.status(400).json({
        error: "Invalid value for is_open_to_public. Use true or false.",
      });
    }
  }

  try {
    const places = await Place.find(queryObj);
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export {
  getAllPlaces,
  getPlaceByContinent,
  getPlaceByCountry,
  getPlaceByQuery,
  getPlaceById,
};
