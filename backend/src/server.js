import express from "express";
import listingRoute from "./routes/propertyRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//MIDDLE WARE:
app.use(express.json());

app.use("/api/listing", listingRoute);

connectDB().then(() =>{
        app.listen(5001, () => {
        console.log("Sever started at: 5001 at local host.");
    });
})