import { Chat } from "../mongoose/schemas/chat.js";
import { Message } from "../mongoose/schemas/message.js";

export const addMessage = async (req, res) => {

    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;

    try {

        const chat = Chat.findOne({
            _id: chatId,
            userId: {$in: tokenUserId}
        })

        if(!chat) return res.status(404).json({message: "Chat Not Found!"})


        const message = await Message.create({
            userId: tokenUserId,
            chatId,
            text
        })
        message.save();

        await Chat.updateOne({
            _id: chatId,
        },
        {
            $set: {seenBy: tokenUserId},
            $push: {messages: message._id.toString()},
            lastMessage: text
        })

        res.status(200).json(message);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Failed to Add Message!"})
    }
}