import React from "react";

export default function TemplateSelector({ setSelectedTemplate }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Select Template</h2>
      <select className="input" onChange={(e) => setSelectedTemplate(e.target.value)}>
        <option value="template1">Classic</option>
        <option value="template2">Modern</option>
        <option value="template3">Minimal</option>
        <option value="template4">new</option>

      </select>
    </div>
  );
}
