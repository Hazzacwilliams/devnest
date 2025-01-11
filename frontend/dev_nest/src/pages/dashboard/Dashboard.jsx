import React from "react";
import '../../styles/dashboard.css';
import NavBar from "../../components/NavBar";
import Posts from "./Posts";

function Dashboard() {



    return (
        <div id="dashboard">
            <NavBar id="dashNavBar" />
            <Posts />
        </div>
    )
}

export default Dashboard;