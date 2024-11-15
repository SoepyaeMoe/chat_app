import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (inputs) => {
        const success = validator(inputs);
        if (success) {
            try {
                setLoading(true);
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(inputs)
                });

                const data = await res.json();

                if (data.error) {
                    toast.error(data.error);
                    return;
                }

                localStorage.setItem('chat-user', JSON.stringify(data));
                setAuthUser(data);

            } catch (error) {
                toast.error(error.message);

            } finally {
                setLoading(false);
            }

        }
    }

    return { loading, login };
}

const validator = (inputs) => {
    if (!inputs.username || !inputs.password) {
        toast.error("Please provide in all fields.");
        return false;
    }
    return true;
}