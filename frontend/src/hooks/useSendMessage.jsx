import { useState } from "react";
import { useConversation } from "../store/conversation/useConversation";
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);

    const { selectedConversation, setMessages, messages } = useConversation();

    const sendMessage = async (message) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, sendMessage };
}

export default useSendMessage;