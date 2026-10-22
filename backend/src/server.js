import express from "express";

const app = express();

app.listen(5001, () => {
    console.log("Sever started at: 5001 at local host.");
});