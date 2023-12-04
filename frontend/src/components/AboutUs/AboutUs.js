import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as githubIcon } from '../../img/github-mark/githubIcon.svg';
import { ReactComponent as linkedinIcon } from '../../img/linkedin-mark/linkedinIcon.svg';
import allonImg from "../../img/profile-img/allonImg.jpg"
import harrisonImg from "../../img/profile-img/harrisonImg.png"
import spencerImg from "../../img/profile-img/spencerImg.png"
import OmarImg from "../../img/profile-img/OmarImg.jpg"
import './AboutUs.css';

const AboutUsIndex = () => {
  return (
    <div className='.about-team-parent-container'>
      <h2 className="aboutUs-title">About Us</h2>
      <div className="about-us-card">
        <div className='about-us-allon'></div>
            <img className= "about-us-imgs" src={allonImg}/>
            {/* https://github.com/allonnam96 */}
            {/* https://www.linkedin.com/in/hyun-jun96/ */}
            allon.nam96@gmail.com
            Team Lead
            <li>Allon Nam</li>
            <img className= "about-us-imgs" src={OmarImg}/>
            {/* https://github.com/omar-t-ahmed */}
            {/* https://www.linkedin.com/in/omar-ahmed-205152224/ */}
            omartahmed@gmail.com
            Flex
            <li>Omar Ahmed</li>
            <img className= "about-us-imgs" src={harrisonImg}/>
            {/* https://github.com/harrisonlhl123 */}
            {/* https://www.linkedin.com/in/harrison-l-2738bb103/ */}
            liangharrison123@gmail.com
            Backend Lead
            <li>Harrison Liang</li>
            <img className= "about-us-imgs" src={spencerImg}/>
            {/* https://github.com/heyspence */}
            {/* https://www.linkedin.com/in/spencer-heywood-682215a7/ */}
            spencer.heywoodd@gmail.com
            Frontend Lead
            <li>Spencer Heywood</li>
        </div>
      </div>

  );
};

export default AboutUsIndex;
