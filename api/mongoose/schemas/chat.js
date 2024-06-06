import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId: {
        type: [String],
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    seenBy: {
        type: [String]
    },
    messages: {
        type: [String],
        ref: "Message"
    },
    lastMessage: {
        type: String,
        required: false
    }
})

export const Chat = mongoose.model("Chat", ChatSchema);