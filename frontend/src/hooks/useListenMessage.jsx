import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useConversation } from '../store/conversation/useConversation';
import notification from "../assets/sounds/notification.mp3";

const useListenMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notification);
            sound.play();
            setMessages([...messages, newMessage]);

        });
        return () => socket?.off("newMessage");
    }, [messages, socket, setMessages]);
}

export default useListenMessage;