import React from "react";
import "./ClassicTemplate.css"; // assuming you have the CSS

const ClassicTemplate = ({ data }) => {
  if (!data) return <div>Loading template...</div>;

  return (
    <div className="classic-resume">
      <div className="header">
        <h1>{data.name || "Your Name"}</h1>
        <p>
          {data.location || "City, Country"} | {data.phone || "000-000-0000"} |{" "}
          {data.email || "you@example.com"}
        </p>
      </div>

      <section className="summary">
        <h2>Summary</h2>
        <p>{data.summary || "Write a brief professional summary here."}</p>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <ul>
          {(data.skills || ["Skill A", "Skill B", "Skill C"]).map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="experience">
        <h2>Experience</h2>
        {(data.experience || []).map((exp, idx) => (
          <div key={idx}>
            <strong>
              {exp.job_title || "Job Title"} at {exp.company || "Company"}
            </strong>
            <br />
            <em>
              {exp.start_date || "Start"} - {exp.end_date || "End"}
            </em>
            <br />
            <p>{exp.description || "Describe your role and achievements here."}</p>
          </div>
        ))}
      </section>

      <section className="education">
        <h2>Education</h2>
        {(data.education || []).map((edu, idx) => (
          <div key={idx}>
            <strong>{edu.degree || "Degree"} - {edu.institution || "Institution"}</strong>
            <br />
            <em>{edu.year || "Year"}</em>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClassicTemplate;
