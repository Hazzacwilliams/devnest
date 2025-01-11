import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/navbar.css';
import homeIcon from '../assets/navbar/home.png';
import profileIcon from '../assets/navbar/profile.png';
import settingsIcon from '../assets/navbar/settings.png';

function NavBar() {

    const navigate = useNavigate();

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
            <button className="navbarButton"><img src={profileIcon} id="profileIcon" onClick={handleProfileClick} /></button>
            <button className="navbarButton"><img src={homeIcon} id="homeIcon" onClick={handleHomeClick} /></button>
            <button className="navbarButton"><img src={settingsIcon} id="settingsIcon" onClick={handleSettingClick} /></button>
            </div>
            <div>
            <input type="text" placeholder="SEARCH" id="searchBar"></input>
            </div>
        </div>
    )
};

export default NavBar;