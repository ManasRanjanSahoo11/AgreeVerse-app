import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/user/dashboard", {
                withCredentials: true, 
            });

            if (response.data.success) {
                localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user in localStorage
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        }
    };

    // Fetch user details on mount
    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
