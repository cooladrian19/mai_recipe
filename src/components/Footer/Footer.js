import React from "react";
import './style.css';
import githubLogo from '../../assets/github.png';
import linkedinLogo from '../../assets/linkedin.png';
import chopsticksLogo from '../../assets/chopsticks.png';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <a className="footer-title" href="/">
                <img src={chopsticksLogo} alt="Chopsticks" />
                <h2>mai's recipe</h2>
            </a>
            <div className="footer-info">
                <div className="github-container" >
                    <a href="https://github.com/cooladrian19" target="_blank" rel="noopener noreferrer" className="hover-line">
                        <img className= "github-logo" src={githubLogo} alt="GitHub" /> github
                    </a>
                </div>
                <div className="linkedin-container">
                    <a href="https://www.linkedin.com/in/nguyena270" target="_blank" rel="noopener noreferrer" className="hover-line">
                        <img className="linkedin-logo" src={linkedinLogo}alt="LinkedIn" /> linkedin
                    </a>
                </div>
                <Link to="/about" className="hover-line">about</Link>
            </div>
        </div>
    );
}
