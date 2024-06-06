import mongoose from "mongoose";
import { PostDetailSchema } from "./postDetails.js";
// import { User } from "./user.js";

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    price:{
        type: Number,
    },
    img:{
        type: [String],
    },
    address:{
        type: String,
    },
    city:{
        type: String,
    },
    bathroom:{
        type: Number,
    },
    bedroom:{
        type: Number,
    },
    type: {
        type: String,
        enum: ['buy', 'rent']
    },
    property: {
        type: String,
        enum: ['apartment', 'house', 'condo', 'land']
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type : String,
        ref: 'User'
    },
    postDetail: PostDetailSchema
})

export const Post = mongoose.model("Post", PostSchema);