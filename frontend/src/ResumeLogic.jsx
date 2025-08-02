// ResumeLogic.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ResumeUI from "./ResumeUI";

const API_URL = import.meta.env.VITE_API_URL;

function ResumeLogic({ selectedTemplate, setPreviewData, registerDownload }) {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
  });

  const [localPreview, setLocalPreview] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = "user123";

  useEffect(() => {
    if (setPreviewData) {
      setPreviewData(resumeData);
    }
  }, [resumeData, setPreviewData]);

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
      setLocalPreview(response.data.resume);
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
      setLocalPreview(response.data.resume);
      setPreviewData(response.data.resume);
    } catch (error) {
      console.error("Load Error:", error);
      alert("No saved resume found.");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const data = localPreview;

    if (Object.keys(data).length === 0) {
      alert("Nothing to download yet. Please enhance or fill your resume.");
      return;
    }

    if (selectedTemplate === "classic") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Resume", 14, 20);
      const rows = Object.entries(data).map(([key, value]) => [key, value]);
      autoTable(doc, {
        startY: 30,
        head: [["Field", "Content"]],
        body: rows,
      });
    } else if (selectedTemplate === "modern") {
      doc.setFillColor(245, 245, 255);
      doc.rect(0, 0, 210, 297, "F");
      doc.setTextColor(33, 37, 41);
      doc.setFontSize(22);
      doc.text("Modern Resume", 14, 20);
      const rows = Object.entries(data).map(([key, value]) => [
        key.toUpperCase(),
        value,
      ]);
      autoTable(doc, {
        startY: 35,
        head: [["Section", "Details"]],
        body: rows,
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { textColor: 50, fontStyle: "normal" },
      });
    } else if (selectedTemplate === "minimal") {
      doc.setFontSize(16);
      doc.setFont("times", "italic");
      doc.text("Minimal Resume", 105, 20, null, null, "center");
      const rows = Object.entries(data).map(([key, value]) => [key, value]);
      autoTable(doc, {
        startY: 30,
        body: rows,
        styles: { fontSize: 11 },
      });
    }

    doc.save("resume.pdf");
  };

  // ✅ Register this downloadPDF function to the parent via prop
  useEffect(() => {
    if (registerDownload) {
      registerDownload(() => downloadPDF);
    }
  }, [selectedTemplate, localPreview]);

  return (
    <div className="app">
      <ResumeUI
        resumeData={resumeData}
        previewData={localPreview}
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
