import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthRoute({ children }){
    const { user, loading } = useSelector((state) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading || !user){
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, [user, loading, navigate])

    if(loading){
        return <div>Loading...</div>
    }

    return children;
}

export default AuthRoute;