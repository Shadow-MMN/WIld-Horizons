import express from "express";
import {
  getAllPlaces,
  getPlaceByContinent,
  getPlaceByCountry,
  getPlaceByQuery,
  getPlaceById,
} from "../controllers/placeController.js";

const placeRouter = express.Router();

placeRouter
  .get("/", getAllPlaces)
  .get("/:id", getPlaceById)
  .get("/continent/:continent", getPlaceByContinent)
  .get("/country/:country", getPlaceByCountry)
  .get("/search", getPlaceByQuery);

export default placeRouter;
