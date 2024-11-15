import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';
import { useConversation } from "../store/conversation/useConversation";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const { setSelectedConversation } = useConversation();

    const logout = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/auth/logout", {
                method: 'POST'
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
                return;
            }

            localStorage.removeItem('chat-user');
            setAuthUser(null);
            setSelectedConversation(null);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, logout };
}

export default useLogout;