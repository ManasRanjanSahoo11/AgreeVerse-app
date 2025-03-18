import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const GoogleAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/user/dashboard", {
                    withCredentials: true,
                });

                const role = res.data.user?.role; 

                if (role === "admin") navigate("/admin/dashboard");
                else if (role === "coordinator") navigate("/coordinator/dashboard");
                else if (role === "farmer") navigate("/farmer/dashboard");
                else navigate("/user/dashboard");
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login"); 
            }
        };

        fetchUserData();
    }, [navigate]);

    return <Loading />;
};

export default GoogleAuthRedirect;