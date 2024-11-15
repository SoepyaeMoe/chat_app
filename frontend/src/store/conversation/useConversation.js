import { useSelector, useDispatch } from "react-redux";
import { selected, setMessagesSlice } from "./conversationSlice";

export const useConversation = () => {
    const selectedConversation = useSelector(state => state.conversation.selectedConversation);
    const dispatch = useDispatch();

    const setSelectedConversation = (data) => {
        dispatch(selected(data));
    }

    const setMessages = (data) => {
        dispatch(setMessagesSlice(data));
    }

    const messages = useSelector(state => state.conversation.messages);

    return { selectedConversation, setSelectedConversation, messages, setMessages };
}
