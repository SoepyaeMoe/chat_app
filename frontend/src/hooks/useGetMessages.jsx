import { useEffect, useState } from "react";
import { useConversation } from "../store/conversation/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const { selectedConversation, messages, setMessages } = useConversation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/message/${selectedConversation._id}`);
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getMessages();
    }, [selectedConversation]);

    return { loading, messages }
}

export default useGetMessages;