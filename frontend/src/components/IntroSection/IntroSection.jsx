import React from 'react';
import './IntroSection.css'; // Import your CSS file with the styles
import house_icon from '../../img/house-icon-clipart-transparent-background-free-png.webp'

const IntroSection = () => {
    return (
        <div className='outer-intro'>
        <div className="intro-container">
            <div className="intro-content">
                <p>Welcome to,</p>
                <h1>HomeKeeper</h1>
                <p>Your go-to platform for hassle-free home transformations.</p>
                {/* <button>get started</button> */}
            </div>
            <div className="intro-image-placeholder" data-aos="zoom-out" data-aos-delay="300">
                <img className='house-icon' src={house_icon}></img>
            </div>
        </div>
            <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none">
                <defs>
                    <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                </defs>
                <g className="wave1">
                    <use xlinkHref="#wave-path" x="50" y="3" fill="rgba(255,255,255, .2)"></use>
                </g>
                <g className="wave2">
                    <use xlinkHref="#wave-path" x="50" y="0" fill="rgba(255,255,255, .3)"></use>
                </g>
                <g className="wave3">
                    <use xlinkHref="#wave-path" x="50" y="9" fill="var(--secondary-background)"></use>
                </g>
            </svg>
        </div>
    );
}

export default IntroSection;