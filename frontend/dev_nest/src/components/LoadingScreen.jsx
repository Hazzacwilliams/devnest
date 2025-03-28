import React from "react";
import Lottie from 'react-lottie';
import digitalPortal from '../assets/loadingAnimation/digitalPortal.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: digitalPortal,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

function LoadingScreen() {
    return (
        <div>
            <h1>Loading Dev_Nest...</h1>
            <p>Please wait whilst we get everything setup for you!</p>
            <Lottie options={defaultOptions} height={200} width={200} />
        </div>
    )
}

export default LoadingScreen;