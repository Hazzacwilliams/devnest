import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { updateUserInfo } from "../../redux/slices/getUserInfoSlice";
import ProfilePictureUpload from '../../components/ProfilePictureUpload';
import '../../styles/settings.css';
import { logout } from '../../redux/slices/loginSlice';

function Settings() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ 
            username: '',
            email: '',
            name: '',
            mobile: '',
            region: '',
            password: ''
        });

        const dispatch = useDispatch();

        const { loading, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(formData));
        setFormData({
            username: '',
            email: '',
            name: '',
            mobile: '',
            region: '',
            password: ''
        })
    }

    const handleLogOut = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div id="settingsPage">
            <NavBar />
            <form onSubmit={handleSubmit}>
                <h2>Update User Details</h2>
                <input type='text' name="username" onChange={handleChange} placeholder='USERNAME' value={formData.username}></input>
                <input type='email' name="email" onChange={handleChange} placeholder='EMAIL' value={formData.email}></input>
                <input type='text' name="name" onChange={handleChange} placeholder='NAME' value={formData.name}></input>
                <input type='text' name="mobile" onChange={handleChange} placeholder='MOBILE NUMBER' value={formData.mobile}></input>
                <input type='text' name="region" onChange={handleChange} placeholder='REGION' value={formData.region}></input>
                <input type='password' name="password" onChange={handleChange} placeholder='PASSWORD' value={formData.password}></input>
                <button type='submit' disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <div id="profilePictureSettings">
                <h2>Update Profile Picture</h2>
                <ProfilePictureUpload />
            </div>
            <div>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
};

export default Settings;