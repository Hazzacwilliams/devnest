import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Allows access to pages if logged in
const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.login);
    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;