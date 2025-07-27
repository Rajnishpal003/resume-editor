import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Resume Builder</div>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <nav className={`nav ${isOpen ? "open" : ""}`}>
          <a href="#" className="nav-link">
            Options
          </a>
          <a href="#" className="nav-link">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
