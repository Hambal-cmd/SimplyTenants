import mongoose from "mongoose";

const property = mongoose.Schema(
    {
        Name:{
            type: String,
            require: true
        },
        Content:{
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

const Property = mongoose.model("Property", property);

export default Property;