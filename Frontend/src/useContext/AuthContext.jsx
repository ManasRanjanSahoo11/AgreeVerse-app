import React, { Children, createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    //Fetch user information
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true)

                const res = await axios.post('', { withCredentials: true })

                if (res.data && res.data.user) {
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }

            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserData()
    }, [])

    const value = {
        isLoading,
        isAuthenticated,
        user,
      };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}