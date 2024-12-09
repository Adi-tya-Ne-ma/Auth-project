import { useAuth } from "../store/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Logout = () => {

    const { LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);
    
    return <Navigate to="/login" />;
};