import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/loginForm.css';

const LoginForm = () => {

    //Creating useState for form fields
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });

    //Set up dispatch for Redux Store
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.login);

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
        try{
            const result = await dispatch(loginUser(formData)).unwrap();
            if(result){
                navigate('/dashboard');
                setFormData({
                    email: '',
                    password: ''
                });
            } else {
                console.error("Login failed.", result.message);
            }
        } catch (err) {
            console.error("Error during login", err);
        }
    };

    return (
        <form id="loginForm" onSubmit={handleSubmit}>
            <h2>Already Register? Login Here!</h2>
            <input type="email" name='email' onChange={handleChange} placeholder='EMAIL' value={formData.email}></input>
            <input type="password" name='password' onChange={handleChange} placeholder='PASSWORD' value={formData.password}></input>
            <button type='submit' disabled={loading}>{loading ? 'Logging in..' : 'Login'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default LoginForm;