import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

export const useSingUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, gender, password, confirmPassword }) => {
        const success = validator(fullName, username, gender, password, confirmPassword);

        if (success) {
            try {
                setLoading(true);

                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ fullName, username, gender, password, confirmPassword })
                });
                const data = await res.json();

                if (data.error) {
                    toast.error(data.error);
                    return;
                }
                localStorage.setItem('chat-user', JSON.stringify(data));
                setAuthUser(data);

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return { loading, signup };
}

const validator = (fullName, username, gender, password, confirmPassword) => {
    if (!fullName || !username || !gender || !password || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Confirm password does not match.");
        return false;
    }
    return true;
}