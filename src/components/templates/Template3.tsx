import React from "react";
import { CVFormData } from "../CVForm"; // Adjust the path as needed

interface Props {
  formData: CVFormData;
}

export default function Template3({ formData }: Props) {
  return (
    <div className="cv-preview grid grid-cols-3 gap-4 bg-white text-black p-6 rounded shadow text-sm">
      {/* Left Panel */}
      <div className="col-span-1 bg-blue-100 p-4 rounded-md">
        {formData.photo && (
          <div className="flex justify-center mb-4">
            <img
              src={formData.photo}
              alt="Profile"
              className="w-24 object-cover rounded border"
            />
          </div>
        )}

        <div className="text-center font-bold text-lg mb-2">{formData.name}</div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold border-b pb-1">CONTACT</h3>
          <p className="text-xs mt-2 break-words">{formData.email}</p>
          <p className="text-xs break-words">{formData.phone}</p>
          <p className="text-xs break-words">{formData.linkedin}</p>
          <p className="text-xs break-words">{formData.portfolio}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold border-b pb-1">SUMMARY</h3>
          <p className="text-xs mt-2 break-words">{formData.summary}</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="col-span-2 p-4">
        <div className="mb-4">
          <h3 className="text-base font-bold border-b pb-1">EDUCATION</h3>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="mt-2">
              <p className="font-semibold text-sm">{edu.degree}</p>
              <div className="text-xs flex justify-between">
                <div>{edu.institution}</div>
                <div><i>{edu.year}</i></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-base font-bold border-b border-black mb-1">SKILLS</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.technicalSkills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-bold border-b pb-1">EXPERIENCE</h3>
          {formData.experience.map((exp, idx) => (
            <div key={idx} className="mt-2">
              <p className="font-semibold text-sm">{exp.role} at {exp.company}</p>
              <p className="italic text-xs">{exp.duration}</p>
              <p className="text-xs">{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-base font-bold border-b pb-1">PROJECTS</h3>
          {formData.projects.map((proj, idx) => (
            <div key={idx} className="mt-2">
              <p className="font-semibold text-sm">{proj.title}</p>
              <p className="italic text-xs">{proj.tech}</p>
              <p className="text-xs">{proj.description}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-xs"
                >
                  {proj.link}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
