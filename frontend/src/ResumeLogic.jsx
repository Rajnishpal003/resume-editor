// ResumeLogic.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ResumeUI from "./ResumeUI";
import Header from "./Header";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function ResumeLogic() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
  });

  const [previewData, setPreviewData] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = "user123";

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const enhanceResume = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/ai-enhance`, {
        user_id: userId,
        resume: resumeData,
      });
      setPreviewData(response.data.resume);
    } catch (error) {
      console.error("Enhance Error:", error);
      alert("Failed to enhance resume.");
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    try {
      await axios.post(`${API_URL}/save-resume`, {
        user_id: userId,
        resume: resumeData,
      });
      alert("Resume saved!");
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save resume.");
    }
  };

  const loadResume = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-resume/${userId}`);
      setResumeData(response.data.resume);
      setPreviewData(response.data.resume);
    } catch (error) {
      console.error("Load Error:", error);
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

  return (
    <div className="app">
      <Header />
      <ResumeUI
        resumeData={resumeData}
        previewData={previewData}
        loading={loading}
        handleChange={handleChange}
        enhanceResume={enhanceResume}
        saveResume={saveResume}
        loadResume={loadResume}
        downloadPDF={downloadPDF}
      />
    </div>
  );
}

export default ResumeLogic;
