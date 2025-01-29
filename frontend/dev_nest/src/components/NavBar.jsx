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

    const loggedInUser = useSelector((state) => state.login.user);

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
            <button className="navbarButton"><img src={loggedInUser.profilepic_url || profileIcon} id="profileIcon" onClick={handleProfileClick} /></button>
            <button className="navbarButton"><img src={homeIcon} id="homeIcon" onClick={handleHomeClick} /></button>
            <Notifications />
            <button className="navbarButton"><img src={settingsIcon} id="settingsIcon" onClick={handleSettingClick} /></button>
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