import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen.jsx";

function AuthRoute({ children }) {
    const { user, loading } = useSelector((state) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading || !user) {
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, [user, loading, navigate])

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return children;
}

export default AuthRoute;