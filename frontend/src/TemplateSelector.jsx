import React, { useRef, useEffect } from "react";
import "./TemplateSelector.css";

const templates = [
  { id: "classic", name: "Classic", preview: "./assets/img/classic.png" },
  { id: "modern", name: "Modern", preview: "./assets/img/modern.png" },
  { id: "minimal", name: "Minimal", preview: "./assets/img/minimal.png" },
];

const TemplateSelector = ({ onSelect, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // Close modal if clicked outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="template-modal">
      <div className="template-container" ref={modalRef}>
        <div className="template-header">
          <h2>Choose a Template</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="template-grid">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="template-card"
              onClick={() => onSelect(tpl.id)}
            >
              <img src={tpl.preview} alt={tpl.name} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
              <div className="template-name">{tpl.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
