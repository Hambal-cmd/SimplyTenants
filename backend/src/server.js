import express from "express";
import listingRoute from "./routes/propertyRoutes.js";

const app = express();

app.use("/api/listing", listingRoute);

app.listen(5001, () => {
    console.log("Sever started at: 5001 at local host.");
});