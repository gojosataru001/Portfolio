import React from "react";
import { CVFormData } from "../CVForm"; // or "../types" if extracted


interface Props {
  formData: CVFormData;
}

export default function Template1( {formData}: Props) {
  const {
    name = "",
    email = "",
    phone = "",
    linkedin = "",
    portfolio = "",
    photo = "",
    summary = "",
    education = [],
    experience = [],
    technicalSkills = [],
    projects = [],
    
  } = formData;

  return (
    <div className="p-10 font-serif text-black bg-white max-w-3xl mx-auto border border-gray-300 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-500 pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-wide">{name}</h1>
          <p className="text-sm mt-1">{email} | {phone}</p>
          <p className="text-sm">
            {linkedin && <span>LinkedIn: {linkedin}</span>}
            {portfolio && <span className="ml-2">Portfolio: {portfolio}</span>}
          </p>
        </div>
        {photo && (
          <img
            src={photo}
            alt="Profile"
            className="h-30  object-cover rounded border border-gray-400 shadow"
          />
        )}
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 mb-2">Profile Summary</h2>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 mb-2">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold text-sm">{edu.degree}</p>
              <p className="text-xs">{edu.institution} | {edu.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 mb-2">Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold text-sm">{exp.role} at {exp.company}</p>
              <p className="text-xs italic mb-1">{exp.duration}</p>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 mb-2">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold text-sm">{proj.title}</p>
              <p className="text-xs">{proj.tech}</p>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{proj.description}</p>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
                  {proj.link}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      {technicalSkills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 mb-2">Technical Skills</h2>
          <ul className="text-sm flex flex-wrap gap-2">
            {technicalSkills.map((skill, idx) => (
              <li key={idx} className="bg-gray-200 px-2 py-1 rounded text-xs">{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
