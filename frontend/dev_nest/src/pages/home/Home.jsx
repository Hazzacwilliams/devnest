import './home.css';
import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';

function Home(){
    return (
        <div id="homeContainer">
            <div>
                <h1>WELCOME TO DEVNEST!</h1>
            </div>
            <div id="homePanelContainer">
                <div id="leftPanel" class="homePanel">
                    <RegisterForm />
                </div>
                <div id="rightPanel" class="homePanel">
                    <LoginForm />
                </div>
            </div>
        </div>
        
        
    )
}

export default Home;