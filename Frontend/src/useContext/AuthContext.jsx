import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to fetch user data (only called after successful login)
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/user/dashboard", {
                withCredentials: true,
            });

            if (response.data.success) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
