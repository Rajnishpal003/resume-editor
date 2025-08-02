import React from "react";
import "./MinimalTemplate.css";

const MinimalTemplate = ({ data }) => {
  return (
    <div className="minimal-resume">
      <div className="top">
        <h1>{data.name}</h1>
        <h3>{data.role}</h3>
        <p>{data.address}<br />{data.phone}<br />{data.email}</p>
      </div>

      <section>
        <h2>Short Bio</h2>
        <p>{data.summary}</p>
      </section>

      <section>
        <h2>Work Experience</h2>
        {data.experience.map((job, i) => (
          <div key={i}>
            <strong>{job.title} at {job.company}</strong><br />
            <em>{job.start} - {job.end}</em><br />
            <em>{job.location}</em>
            <p>{job.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {data.education.map((edu, i) => (
          <div key={i}>
            <strong>{edu.course}</strong><br />
            <em>{edu.institute}</em><br />
            <em>{edu.year}</em><br />
            <p>{edu.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MinimalTemplate;
