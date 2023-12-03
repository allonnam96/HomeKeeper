import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as githubIcon } from '../../img/github-mark/githubIcon.svg';
import { ReactComponent as linkedinIcon } from '../../img/linkedin-mark/linkedinIcon.svg';
import './AboutUs.css';

const AboutUsIndex = () => {
  return (
    <div className="aboutUs-container">
      <h2 className="aboutUs-title">About Us</h2>
      <div className="aboutUs-card">
        <div className='aboutUs-column'>
          <ul className='aboutUs-name'>
            <li>Allon Nam</li>
            <li>Omar</li>
            <li>Harrison</li>
            <li>Spencer</li>
          </ul>
        </div>
        <div className='aboutUs-column'>
          <ul className='aboutUs-info'>
            {/* Add your info here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUsIndex;
