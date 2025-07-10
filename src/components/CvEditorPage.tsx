import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CVForm from "./CVForm";
import CVPreview from "./CVPreview";
import DownloadPDFButton from "./DownloadStyledPDFButton";



// ✅ Step 1: Define the type (or import it if it's in another file)
export interface CVFormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  photo: string;
  summary: string;
  education: { degree: string; institution: string; year: string }[];
  experience: { role: string; company: string; duration: string; description: string }[];
  technicalSkills: string[];
  softSkills?: string[]; // Optional if used
  languages?: string[];
  certifications?: { title: string; issuer: string; date: string; link?: string }[];
  projects: { title: string; tech: string; description: string; link?: string }[];
}

// ✅ Step 2: Start your component

export default function CvEditorPage() {
  const [formData, setFormData] = useState<CVFormData>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    photo: "",
    summary: "",
    education: [],
    experience: [],
    technicalSkills: [],
    softSkills: [],
    languages: [],
    certifications: [],
    projects: [],
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>("template1");
  const [showPreviewMobile, setShowPreviewMobile] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCV = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/cv", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            linkedin: res.data.linkedin || "",
            portfolio: res.data.portfolio || "",
            photo: res.data.photo || "",
            summary: res.data.summary || "",
            education: res.data.education || [],
            experience: res.data.experience || [],
            technicalSkills: res.data.technicalSkills || [],
            softSkills: res.data.softSkills || [],
            languages: res.data.languages || [],
            certifications: res.data.certifications || [],
            projects: res.data.projects || [],
          });
        }
      } catch (err) {
        console.error("❌ Failed to fetch CV:", err);
      }
    };

    fetchCV();
  }, []);

  //  Return the layout (form + preview)
  return (
    <motion.div className="flex flex-col md:flex-row gap-6 p-4 min-h-screen">
      {/* Left: Form Section */}
      <motion.div className={`flex-1 ${showPreviewMobile ? "hidden" : "block"} md:block`}>
        <div className="flex gap-4 mt-4">
          <DownloadPDFButton formData={formData} />
          <button
            className="md:hidden bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowPreviewMobile(true)}
          >
            Show Preview
          </button>
        </div>
        <CVForm formData={formData} setFormData={setFormData} />
      </motion.div>

      {/* Right: Preview Section */}
      <motion.div className={`flex-1 ${showPreviewMobile ? "block" : "hidden"} md:block`}>
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowPreviewMobile(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Back to Form
          </button>
        </div>

        <div className="mb-4 hidden md:block font-bold">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="px-3 py-2 rounded-xl text-white"
          >
            <option value="template1" className="text-black">Template 1</option>
            <option value="template2" className="text-black">Template 2</option>
            <option value="template3" className="text-black">Template 3</option>
            <option value="template4" className="text-black">Template 4</option>
          </select>
        </div>

        <motion.div
          ref={previewRef}
          className="p-4 rounded shadow-lg overflow-auto"
          style={{ backgroundColor: "#fff", width: "794px", minHeight: "1123px" }}
        >
          <CVPreview formData={formData} selectedTemplate={selectedTemplate} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
