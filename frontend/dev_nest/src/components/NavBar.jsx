import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../redux/slices/getUserInfoSlice";

import Search from './Search';
import '../styles/navbar.css';
import homeIcon from '../assets/navbar/home.png';
import profileIcon from '../assets/navbar/profile.png';
import settingsIcon from '../assets/navbar/settings.png';
import Notifications from "../pages/dashboard/Notifications";

function NavBar() {

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.login.user);

    useEffect(() => {
        dispatch(getUserInfo(loggedInUser.userid));
    }, [dispatch, loggedInUser.profilepic_url])

    const navigate = useNavigate();

    const profilePic = loggedInUser.profilepic_url !== null ? loggedInUser.profilepic_url : profileIcon;

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
            <button className="navbarButton"><img src={`${profilePic}?t=${new Date().getTime()}`} id="profileIcon" onClick={handleProfileClick} /></button>
            <button className="navbarButton"><img src={homeIcon} id="homeIcon" onClick={handleHomeClick} /></button>
            <h1 id="appTitle">DEVNEST</h1>
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