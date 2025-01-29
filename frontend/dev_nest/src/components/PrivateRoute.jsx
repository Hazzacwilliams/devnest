import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.login);
    localStorage.setItem('user', user);

    if (loading) {
        return <div>Loading...</div>; 
    } else if (!localStorage.getItem('user')){
        <Navigate to="/"/>
    }
    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
