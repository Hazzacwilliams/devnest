import React from "react";
import '../../styles/dashboard.css';
import NavBar from "../../components/NavBar";
import PostsCreation from "./PostsCreation";
import PostData from './PostData.jsx';

function Dashboard() {



    return (
        <div id="dashboard">
            <NavBar id="dashNavBar" />
            <PostsCreation />
            <PostData />
        </div>
    )
}

export default Dashboard;