import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/cocket.js";

export const sendMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user._id;
        const { message } = req.body;

        const receiver = await User.findById(receiverId);

        if (!receiver) return res.status(400).json({ error: 'Invalid user.' });

        if (!message) return res.status(400).json({ error: 'Message field is require.' });

        const sendMessage = new Message({
            senderId,
            receiverId,
            message
        });

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId]
            });
        }

        conversation.messages.push(sendMessage._id);

        Promise.all([await sendMessage.save(), await conversation.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", sendMessage);
        }

        return res.status(200).json(sendMessage);

    } catch (error) {
        console.log(`Error in send message: ${error.message}`);
        return res.status(500).json('Internal Server Error');
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const receiver = await User.findById(receiverId);

        if (!receiver) return res.status(400).json({ error: 'Invalid user.' });

        const conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } }).populate("messages");

        let messages = [];

        if (conversation) {
            messages = conversation.messages;
        }

        return res.status(200).json(messages);
    } catch (error) {
        console.log(`Error in get message ${error.message}`);
        return res.status(500).json('Internal Server Error');
    }
}