import mongoose from "mongoose";

const SavedPostSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User"
    },
    postId: {
        type: String,
        ref:"Post"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

SavedPostSchema.index({userId: 1, postId: 1}, {unique: true});

export const SavedPost = mongoose.model("SavedPost", SavedPostSchema);