//Imports
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    //Initializing Component
    const { user, loading } = useSelector((state) => state.login);
  
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/" />;
  
    return children;
  };
  

export default PrivateRoute;
