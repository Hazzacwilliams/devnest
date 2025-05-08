//Imports
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen.jsx";

function AuthRoute({ children }) {
    const { user, loading } = useSelector((state) => state.login);
    const navigate = useNavigate();

    //UseEffect to see if user is already logged in or not.
    useEffect(() => {
        if (!loading || !user) {
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, [user, loading, navigate])

    //Returns loading screen for when there is a substantial delay in loading times.
    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return children;
}

export default AuthRoute;