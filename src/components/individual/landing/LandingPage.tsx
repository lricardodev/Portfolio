"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./LandingPage.css";

export const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    setIsDarkMode(dark);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`landing-page`}>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <h1>My Portfolio</h1>
          </div>
          <div className="nav-controls">
            <ul className="nav-menu">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <Link href="/terminal">Terminal</Link>
              </li>
            </ul>
            <div className="theme-toggle">
              <button
                className={`theme-switch ${isDarkMode ? "dark" : "light"}`}
                onClick={toggleTheme}
                aria-label={
                  isDarkMode ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                <span className="theme-icon">
                  {isDarkMode ? "☀️" : "🌙"}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to my <span className="highlight">Code Laboratory</span>
          </h1>
          <p className="hero-subtitle">
            Here I experiment, learn and develop creative solutions through
            programming
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">View Projects</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-animation">
            <div className="code-line">const innovation = "creativity";</div>
            <div className="code-line">let learning = "constant";</div>
            <div className="code-line">function solve() {"{"}</div>
            <div className="code-line"> return "solutions";</div>
            <div className="code-line">{"}"}</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-icon">🚀</div>
              <h3>Eratosthenes Algorithm</h3>
              <p>Implementation of the algorithm to find prime numbers</p>
              <div className="project-tags">
                <span className="tag">JavaScript</span>
                <span className="tag">Algorithms</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-icon">⚡</div>
              <h3>Coming Soon</h3>
              <p>New projects in development</p>
              <div className="project-tags">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-icon">💡</div>
              <h3>Experiments</h3>
              <p>Code tests and experiments</p>
              <div className="project-tags">
                <span className="tag">Node.js</span>
                <span className="tag">APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Technologies and Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skill-items">
                <span className="skill-item">React</span>
                <span className="skill-item">TypeScript</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">HTML/CSS</span>
                <span className="skill-item">Tailwind CSS</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skill-items">
                <span className="skill-item">Node.js</span>
                <span className="skill-item">Express</span>
                <span className="skill-item">Python</span>
                <span className="skill-item">REST APIs</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <div className="skill-items">
                <span className="skill-item">Git</span>
                <span className="skill-item">VS Code</span>
                <span className="skill-item">Postman</span>
                <span className="skill-item">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Shall We Work Together?</h2>
          <p className="contact-text">
            I'm always open to new opportunities and interesting collaborations
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>your.email@example.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">💼</span>
              <span>LinkedIn</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🐙</span>
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 My Portfolio. Made with ❤️ and lots of code.</p>
        </div>
      </footer>
    </div>
  );
};
