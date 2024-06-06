import { Chat } from "../mongoose/schemas/chat.js";
import { User } from "../mongoose/schemas/user.js";

export const getChats = async (req, res) => {

    const tokenUserId = req.userId
    try {

        const chats = await Chat.find({userId: tokenUserId}).populate("userId", "_id username avatar")

        res.status(200).json(chats);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to Get Chats!"})
    }
}

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await Chat.findOneAndUpdate({
            _id: req.params.id,
            userId: {$in: tokenUserId}
        }, {
            $addToSet: {seenBy: tokenUserId}
        },
            {
            new: true
        })
        .populate({
            path: "messages",
            sort: {createdAt: 1}
        })

        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to Get Chat!"})
    }
}

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    const receiverId = req.body.receiverId;

    try {
        const newChat = await Chat.create({
            userId: [tokenUserId, receiverId]
        })
        newChat.save();
        const chatId = newChat._id.toString();

        const user = await User.updateMany({_id: {$in: [tokenUserId, receiverId]} }, {$push: {chat: chatId}});
        
        res.status(200).json(newChat);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to Add Chat!"})
    }
}

export const readChat = async (req, res) => {

    const tokenUserId = req.userId

    try {
        const chat = await Chat.findOneAndUpdate({
            _id: req.params.id,
            userId: {$in: tokenUserId}
        }, {
            $addToSet: {seenBy: tokenUserId}
        },
            {
            new: true
        })
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to Read Chat!"})
    }
}