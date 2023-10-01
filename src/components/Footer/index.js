import React from "react";
import './style.css';
import githubLogo from '../../assets/github.png';
import linkedinLogo from '../../assets/linkedin.png';
import chopsticksLogo from '../../assets/chopsticks.png';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-title">
                <img src={chopsticksLogo} alt="Chopsticks" />
                <h2>mai's recipe</h2>
            </div>
            <div className="footer-info">
                <div className="github-container">
                    <a href="https://github.com/cooladrian19" target="_blank" className="hover-line">
                        <img className= "github-logo" src={githubLogo} alt="GitHub" /> GitHub
                    </a>
                </div>
                <div className="linkedin-container">
                    <a href="https://www.linkedin.com/in/nguyena270" target="_blank" className="hover-line">
                        <img className="linkedin-logo" src={linkedinLogo}alt="LinkedIn" /> LinkedIn
                    </a>
                </div>
                <a href="about.html" className="hover-line">about</a>
            </div>
        </div>
    );
}

export default Footer;