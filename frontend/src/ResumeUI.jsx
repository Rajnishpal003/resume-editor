import React from "react";
import "./App.css";
function ResumeUI({
  resumeData,
  previewData,
  loading,
  handleChange,
  enhanceResume,
  saveResume,
  loadResume,
  downloadPDF,
}) {
  return (
    <div className="resume-ui">
      {/* Left Panel: Form Section */}
      <div className="form-container">
       

        <div className="section-header">
          <h2>Your Experience</h2>
          <p>
            Include your last 10 years of relevant experience and dates. List your
            most recent position first.
          </p>
        </div>

        <div className="form-fields">
          <div className="experience-entry">
            <div className="row">
                <div className="one">
                    <p><b>Personal Information</b></p>
                 <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={resumeData.name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={resumeData.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  value={resumeData.education || ""}
                  onChange={handleChange}
                />
              </div>
               <div className="input-group">
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={resumeData.skills || ""}
                  onChange={handleChange}
                />
                </div>
           
              <div className="one">
                <p><b>Work Experience</b></p>
                <div className="input-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="job_title"
                  value={resumeData.job_title || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Company/Employer</label>
                <input
                  type="text"
                  name="company"
                  value={resumeData.company || ""}
                  onChange={handleChange}
                />
              </div>   
            </div>

            <div className="row">
              <div className="input-group">
                <label>Period (From)</label>
                <input
                  type="text"
                  name="start_date"
                  value={resumeData.start_date || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Period (To)</label>
                <input
                  type="text"
                  name="end_date"
                  value={resumeData.end_date || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={resumeData.location || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
              </div>
 </div>
            <div className="input-group full">
              <label><b>Short Bio</b></label>
              <textarea
                name="short_bio"
                value={resumeData.short_bio || ""}
                onChange={handleChange}
                placeholder="Write your professional overview here..."
              />
            
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={enhanceResume} disabled={loading}>
              {loading ? "Enhancing..." : "✨ AI Enhance"}
            </button>
            <button onClick={saveResume}>💾 Save</button>
            <button onClick={loadResume}>📂 Load</button>
            <button onClick={downloadPDF} className="download-btn">
              ⬇️ Download CV
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Resume Preview */}
      <div className="preview-container">
        <div className="resume-preview">
          
<div className="preview-section">
  <h3>Personal Information</h3>
  <p>
    <strong>Name:</strong> {resumeData.name || ""}<br />
    <strong>Email:</strong> {resumeData.email || ""}<br />
    <strong>Education:</strong> {resumeData.education || ""}<br />
    <strong>Skills:</strong> {resumeData.skills || ""}
  </p>
</div>
          <div className="preview-section">
            <h3>Work experience</h3>
            <p>
              <strong>{previewData.job_title || ""} at {previewData.company || ""}</strong><br />
              <em>{previewData.start_date || ""} - {previewData.end_date || ""}</em><br />
              {previewData.location || "Location"}
            </p>
            <p>{previewData.description || "Click on the AI Enhance button to get suggestions!"}</p>
          </div>
           <div className="preview-section">
            <h3>Short bio</h3>
            <p>{previewData.short_bio || "Here your professional overview will appear."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeUI;
