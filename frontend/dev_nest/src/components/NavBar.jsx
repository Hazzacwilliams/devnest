//Imports
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from './Search';
import '../styles/navbar.css';
import homeIcon from '../assets/navbar/home.png';
import profileIcon from '../assets/navbar/profile.png';
import settingsIcon from '../assets/navbar/settings.png';
import Notifications from "../pages/dashboard/Notifications";

function NavBar() {

    //Initializing Component
    const user = useSelector((state) => state.login.user);
    const navigate = useNavigate();
    const profilePic = user?.profilepic_url ? `${user.profilepic_url}?t=${new Date().getTime()}` : profileIcon; //Lazy loading with timestamp to avoid caching isssues

    //Handling navigation for each icon.
    const handleProfileClick = (e) => {
        navigate('/profile');
    }
    const handleHomeClick = (e) => {
        navigate('/dashboard');
    }
    const handleSettingClick = (e) => {
        navigate('/settings');
    }

    return (
        <div id="dashHeader">
            <div id="navbar">
                <button className="navbarButton" id="profileButton" onClick={handleProfileClick}><img src={profilePic} alt="profile" id="profileIcon" /></button>
                <button className="navbarButton" id="homeButton" onClick={handleHomeClick}><img src={homeIcon} alt="home" id="homeIcon" /></button>
                <h1 id="appTitle">DEV_NEST</h1>
                <Notifications />
                <button className="navbarButton" id="settingsButton" onClick={handleSettingClick}><img src={settingsIcon} alt="settings" id="settingsIcon" /></button>
            </div>
            <div>
            </div>
            <div>
                <Search />
            </div>
        </div>
    )
};

export default NavBar;