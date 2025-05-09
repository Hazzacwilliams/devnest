//Imports
import React from "react";
import '../../styles/dashboard.css';
import NavBar from "../../components/NavBar";
import PostsCreation from "./PostsCreation";
import PostData from './PostData.jsx';

function Dashboard() {

    const dOrP = "dashboard"; //Determines if profile or general dashboard display for postdata

    return (
        <div id="dashboard">
            <NavBar id="dashNavBar" />
            <PostsCreation />
            <PostData dOrP={dOrP}/>
        </div>
    )
}

export default Dashboard;