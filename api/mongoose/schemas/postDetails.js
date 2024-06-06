import mongoose from "mongoose";

export const PostDetailSchema = new mongoose.Schema({
    desc: {
        type: String,
    },
    utilities: {
        type: String,
    },
    pet: {
        type: String,
    },
    income: {
        type: String,
    },
    size: {
        type: Number,
    },
    school: {
        type: Number,
    },
    bus: {
        type: Number,
    },
    restaurant: {
        type: Number,
    }
})
