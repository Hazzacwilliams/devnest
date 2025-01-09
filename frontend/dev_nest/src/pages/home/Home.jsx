import './home.css';
import React from 'react';
import RegisterForm from '../../components/RegisterForm';

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
                    <h2>WHAT ARE WE?</h2>
                    <p>A social playground for developers</p>
                </div>
            </div>
        </div>
        
        
    )
}

export default Home;