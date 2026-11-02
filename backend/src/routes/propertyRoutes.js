import express from "express";
import { allListing } from "../controllers/propertyListings.js";

const route = express.Router();

route.get("/", allListing)

export default route;