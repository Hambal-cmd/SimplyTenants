import express from "express";
import { allListing } from "../controllers/listing.js";

const route = express.Router();

route.get("/", allListing)

export default route;