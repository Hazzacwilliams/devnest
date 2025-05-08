//Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../redux/slices/registerSlice';
import { loginUser } from "../redux/slices/loginSlice";

const RegisterForm = () => {

    //Initializing Component
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        mobile: '',
        region: '',
        password: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.register);

    //Saves current input value to useState
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //Changes default behaviour of form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(formData)).unwrap();
            await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
            navigate('/dashboard');
        } catch (err) {
            console.error("Error during login or registration!", err);
        }
        setFormData({
            username: '',
            email: '',
            name: '',
            mobile: '',
            region: '',
            password: ''
        })
    };

    return (
        <form id="registerForm" onSubmit={handleSubmit}>
            <h2>JOIN US TODAY!</h2>
            <input type='text' name="username" onChange={handleChange} placeholder='USERNAME' value={formData.username}></input>
            <input type='email' name="email" onChange={handleChange} placeholder='EMAIL' value={formData.email}></input>
            <input type='text' name="name" onChange={handleChange} placeholder='NAME' value={formData.name}></input>
            <input type='text' name="mobile" onChange={handleChange} placeholder='MOBILE NUMBER' value={formData.mobile}></input>
            <input type='text' name="region" onChange={handleChange} placeholder='REGION' value={formData.region}></input>
            <input type='password' name="password" onChange={handleChange} placeholder='PASSWORD' value={formData.password}></input>
            <button type='submit' disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default RegisterForm;