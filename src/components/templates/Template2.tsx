import React from "react";

export default function Template2({ formData }) {
  return (
    <div className="cv-preview grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded shadow overflow-hidden">
      {/* Left sidebar */}
      <div className="bg-yellow-400 text-black p-6 md:col-span-1 space-y-6">
        {formData.photo && (
          <img
            src={formData.photo}
            alt="Profile"
            className="w-24 rounded object-cover border-1 mx-auto"
          />
        )}
        <div className="text-center">
          <h1 className="text-xl font-bold uppercase">{formData.name}</h1>
          <p className="text-sm uppercase">{formData.title}</p>
        </div>

        <div>
          <h2 className="font-semibold border-b border-black mb-1">Profile</h2>
          <p className="text-sm">{formData.summary}</p>
        </div>

        <div>
          <h2 className="font-semibold border-b border-black mb-1">Contact</h2>
          <ul className="text-sm space-y-1">
            <li>Email: {formData.email}</li>
            <li>Phone: {formData.phone}</li>
            <li>LinkedIn: {formData.linkedin}</li>
            <li>Portfolio: {formData.portfolio}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold border-b border-black mb-1">Skills</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.technicalSkills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right content */}
      <div className="p-6 md:col-span-2 space-y-6">
        <div>
          <h2 className="text-lg font-bold border-b border-gray-400">Professional Experience</h2>
          {formData.experience.map((exp, idx) => (
            <div key={idx} className="mt-2 text-sm">
              <p className="font-semibold">{exp.role} - {exp.company}</p>
              <p className="italic text-gray-600">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold border-b border-gray-400">Education</h2>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="mt-2 text-sm">
              <p className="font-semibold">{edu.degree}</p>
              <p className="italic text-gray-600">{edu.institution} | {edu.year}</p>
            </div>
          ))}
        </div>

        {formData.projects?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-gray-400">Projects</h2>
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="mt-2 text-sm">
                <p className="font-semibold">{proj.title}</p>
                <p className="italic">{proj.tech}</p>
                <p>{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
