// App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";
import Header from "./Header";

function App() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [previewData, setPreviewData] = useState({});
  const userId = "user123";

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const enhanceResume = async () => {
    const response = await axios.post("https://resume-editor-v8nl.onrender.com/ai-enhance", {
      user_id: userId,
      resume: resumeData,
    });
    setPreviewData(response.data.resume);
  };

  const saveResume = async () => {
    await axios.post("https://resume-editor-v8nl.onrender.com/save-resume", {
      user_id: userId,
      resume: resumeData,
    });
    alert("Resume saved!");
  };

  const loadResume = async () => {
    try {
      const response = await axios.get(`https://resume-editor-v8nl.onrender.com/get-resume/${userId}`);
      setResumeData(response.data.resume);
      setPreviewData(response.data.resume);
    } catch {
      alert("No saved resume found.");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Resume", 14, 20);
    const rows = Object.entries(previewData).map(([key, value]) => [key, value]);
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Content"]],
      body: rows,
    });
    doc.save("resume.pdf");
  };

  return (<div className="app">
<Header/>
 
    <div className="container">
      
      <div className="form-section">
        <h2>Resume Form</h2>
        {Object.keys(resumeData).map((field) => (
          <div key={field} className="form-group">
            <label>{field}</label>
            <textarea name={field} value={resumeData[field]} onChange={handleChange} />
          </div>
        ))}
        <div className="buttons">
          <button onClick={enhanceResume}>AI Enhance</button>
          <button onClick={saveResume}>Save</button>
          <button onClick={loadResume}>Load</button>
          <button onClick={downloadPDF}>Download PDF</button>
        </div>
      </div>

      <div className="preview-section">
        <h2>Resume Preview</h2>
        {Object.entries(previewData).map(([key, value]) => (
          <div key={key} className="preview-item">
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
     </div>
  );
}

export default App;
