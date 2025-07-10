import React from "react";

export default function Template4({ formData }) {
  return (
    <div className="max-w-5xl mx-auto flex bg-white text-black shadow-lg rounded overflow-hidden font-sans">
      {/* Left Panel */}
      <div className="w-2/5 bg-teal-100 p-6 relative">
        {formData.photo && (
          <div className="absolute top-6 ">
            <img
              src={formData.photo}
              alt="Profile"
              className="w-24 rounded object-cover  border-white shadow-lg"
            />
          </div>
        )}
        <div className="mt-32">
          <h1 className="text-3xl font-bold">{formData.name}</h1>
          
          <p className="text-sm mt-4 text-gray-700 break-words">
            {formData.summary}
          </p>

          {/* Experience */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">EXPERIENCE</h3>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium text-sm">{exp.role} at {exp.company}</p>
                <p className="text-xs italic">{exp.duration}</p>
                <p className="text-xs text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-teal-800 mb-2">CONTACT</h3>
            <p className="text-xs text-gray-800">{formData.email}</p>
            <p className="text-xs">{formData.phone}</p>
            <p className="text-xs">{formData.linkedin}</p>
            <p className="text-xs">{formData.portfolio}</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/5 bg-white p-6">
        {/* Education */}
        <div>
          <h3 className="text-xl font-semibold text-teal-800 border-b mb-4 pb-1">EDUCATION</h3>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <p className="text-sm font-medium">{edu.degree}</p>
              <p className="text-xs">{edu.institution} - {edu.year}</p>
            </div>
          ))}
        </div>

        {/* Skills with progress bars */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-teal-800 border-b mb-4 pb-1">SKILLS</h3>
          {formData.technicalSkills.map((skill, idx) => (
            <div key={idx} className="mb-4">
              <p className="text-sm font-medium">{skill.name}</p>
              
            </div>
          ))}
        </div>

        {/* Projects */}
        {formData.projects && formData.projects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-teal-800 border-b mb-4 pb-1">PROJECTS</h3>
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="mb-4">
                <p className="text-sm font-semibold">{proj.title}</p>
                <p className="text-xs italic">{proj.tech}</p>
                <p className="text-xs text-gray-700">{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline"
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
