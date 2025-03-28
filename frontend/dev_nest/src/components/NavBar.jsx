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

    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        if(user?.userid){
            dispatch(getUserInfo(user.userid));
        }
    }, [dispatch, user?.userid])

    const navigate = useNavigate();

    const profilePic = user?.profilepic_url ? `${user.profilepic_url}?t=${new Date().getTime()}` : profileIcon;

    console.log("Profile pic in NavBar:", user?.profilepic_url);


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
            <button className="navbarButton" id="profileButton"><img src={`${profilePic}?t=${new Date().getTime()}`} id="profileIcon" onClick={handleProfileClick} /></button>
            <button className="navbarButton" id="homeButton"><img src={homeIcon} id="homeIcon" onClick={handleHomeClick} /></button>
            <h1 id="appTitle">DEV_NEST</h1>
            <Notifications />
            <button className="navbarButton" id="settingsButton"><img src={settingsIcon} id="settingsIcon" onClick={handleSettingClick} /></button>
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