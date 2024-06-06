import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    chat: {
        type: [String],
        ref: "Chat"
    }
})


export const User = mongoose.model("User", UserSchema);