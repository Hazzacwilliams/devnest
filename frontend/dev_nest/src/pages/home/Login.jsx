import './home.css';
import React, { useState } from 'react';
import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';

function Login(){

    const [activePanel, setActivePanel] = useState('left');
    return (
        <div id="homeContainer">
            <div>
                <h1>WELCOME TO DEVNEST!</h1>
            </div>
            <div id="homePanelContainer">
                <div id="leftPanel" className={`homePanel ${activePanel === 'left' ? 'activePanel' : ''}`} onClick={() => setActivePanel('left')}>
                    <RegisterForm />
                </div>
                <div id="rightPanel" className={`homePanel ${activePanel === 'right' ? 'activePanel' : ''}`} onClick={() => setActivePanel('right')}>
                    <LoginForm />
                </div>
            </div>
        </div>
        
        
    )
}

export default Login;