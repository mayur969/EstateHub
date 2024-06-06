import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    userId:{
        type: String
    },
    chatId:{
        type: String,
        ref: "Chat"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
})

export const Message = mongoose.model("Message", MessageSchema)