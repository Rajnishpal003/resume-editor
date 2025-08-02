import React, { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import "./Header.css";

const Header = ({
  username,
  onLogout,
  onTemplateSelect,
  previewData,
  downloadPDF,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId); // local state (optional)
    onTemplateSelect(templateId); // parent
    setShowTemplates(false);
    console.log("✅ Template selected:", templateId);
  };

  const handleDownload = () => {
    if (downloadPDF) {
      downloadPDF();
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">Resume Builder</div>
         <a href="#" className="nav-link" onClick={() => setShowTemplates(prev => !prev)}>
  Choose Template
</a>
            <a href="#" className="nav-link" onClick={handleDownload}>
              Download PDF
            </a>
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>☰</button>
          <nav className={`nav ${isOpen ? "open" : ""}`}>
            <a href="#" className="nav-link" onClick={() => setShowTemplates(true)}>
              Choose Template
            </a>
            <a href="#" className="nav-link" onClick={handleDownload}>
              Download PDF
            </a>
            {username && (
              <div style={styles.right}>
                <span style={styles.welcome}>Welcome, {username}</span>
                <button onClick={onLogout} style={styles.logoutButton}>
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {showTemplates && (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </>
  );
};

const styles = {
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  welcome: {
    fontSize: "1rem",
  },
  logoutButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};

export default Header;
