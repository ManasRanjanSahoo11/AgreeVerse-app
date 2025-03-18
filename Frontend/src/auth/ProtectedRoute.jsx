import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/user/dashboard", {
                    withCredentials: true,
                });

                if (res.data.user) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        fetchUser();
    }, []);

    if (isAuthenticated === null) return <h2>Loading...</h2>;

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;