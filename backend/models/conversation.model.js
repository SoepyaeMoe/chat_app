import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.ObjectId,
            ref: "User",
            require: true
        }
    ],
    messages: [
        {
            type: mongoose.ObjectId,
            ref: "Message",
            default: [],
            require: true
        }
    ]
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;