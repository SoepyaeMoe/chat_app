import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { TiMessages } from "react-icons/ti";
import { useConversation } from "../../store/conversation/useConversation";
import { useEffect, useRef } from "react";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
    const { loading, messages } = useGetMessages();

    useListenMessage();

    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length == 0 && <NoMessage />}
            {loading ? <MessageSkeleton /> : messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}
        </div>
    );
};
export default Messages;


const NoMessage = () => {
    const { selectedConversation } = useConversation();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Say Hi 👋 to {selectedConversation.fullName} ❄</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
}