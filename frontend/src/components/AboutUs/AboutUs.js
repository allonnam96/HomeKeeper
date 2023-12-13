import React from 'react';
import { Link } from 'react-router-dom';
import githubIcon from '../../img/bioIcon-img/GithubIcon.png';
import linkedinIcon from '../../img/bioIcon-img/LinkedInIcon.png';
import allonImg from "../../img/profile-img/AllonImg.jpg"
import harrisonImg from "../../img/profile-img/HarrisonImg.jpg"
import spencerImg from "../../img/profile-img/SpencerImg.jpeg"
import omarImg from "../../img/profile-img/OmarImg.jpg"
import './AboutUs.css';

const AboutUsIndex = () => {
    const teamMembers = [
      {
        imgSrc: allonImg,
        name: 'Allon Nam',
        role: 'Team Lead',
        email: 'allon.nam96@gmail.com',
        githubUrl: 'https://github.com/allonnam96',
        linkedinUrl: 'https://www.linkedin.com/in/hyun-jun96/',
      },      
      {
        imgSrc: omarImg,
        name: 'Omar Ahmed',
        role: 'Flex Lead',
        email: 'omartahmed@gmail.com',
        githubUrl: 'https://github.com/omar-t-ahmed',
        linkedinUrl: 'https://www.linkedin.com/in/omar-ahmed-205152224?trk=contact-info',
      },
      {
        imgSrc: harrisonImg,
        name: 'Harrison Liang',
        role: 'Backend Lead',
        email: 'liangharrison123@gmail.com',
        githubUrl: 'https://github.com/harrisonlhl123',
        linkedinUrl: 'https://www.linkedin.com/in/harrison-l-2738bb103/',
      },    
      {
        imgSrc: spencerImg,
        name: 'Spencer Heywood',
        role: 'Frontend Lead',
        email: 'https://spencerheywood.com/',
        githubUrl: 'https://github.com/heyspence',
        linkedinUrl: 'https://www.linkedin.com/in/spencer-heywood/',
      },
    ];
  
    return (
      <div className='about-team-parent-container'>
        <h2 className="aboutUs-title">About Us</h2>
        <div className="about-us-container">
          {teamMembers.map(member => (
            <div className="about-us-card">
              <img className="about-us-imgs" src={member.imgSrc} alt={`${member.name}`} />
              <div className="about-us-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <a href={`${member.email}`}>{member.email}</a>
                <div className="about-us-socials">
                  <a href={member.githubUrl} target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" />
                  </a>
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <img src={linkedinIcon} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AboutUsIndex;