import { ChangeEvent, Dispatch, FormEvent, ReactNode } from "react";
import axios from "axios";
import { motion } from "framer-motion";

//
// 1. Define the shape of your CV data
//
export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface ProjectEntry {
  title: string;
  tech: string;
  description: string;
  link: string;
}

export interface CVFormData {
  photo?: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  technicalSkills: string[];
  projects: ProjectEntry[];
}

//
// 2. Props for the component
//
interface CVFormProps {
  formData: CVFormData;
  setFormData: Dispatch<React.SetStateAction<CVFormData>>;
}

export default function CVForm({ formData, setFormData }: CVFormProps) {
  const token = localStorage.getItem("token");

  //
  // 3. Save handler stays the same
  //
  const saveToDatabase = async () => {
    try {
      const safeData = JSON.parse(JSON.stringify(formData));
      await axios.post("http://localhost:3000/api/cv", safeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("CV Saved");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save CV. Check console for details.");
    }
  };

  //
  // 4. Change handlers with proper event types
  //
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string,
    section: keyof Omit<CVFormData, "photo" | "name" | "email" | "phone" | "linkedin" | "portfolio" | "summary" | "technicalSkills">
  ) => {
    const updated = [...formData[section]] as any[];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setFormData((prev) => ({ ...prev, [section]: updated } as CVFormData));
  };

  const addEntry = (
    section: "education" | "experience" | "projects",
    emptyObj: EducationEntry | ExperienceEntry | ProjectEntry
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyObj],
    }));
  };

  const removeEntry = (
    section: "education" | "experience" | "projects",
    index: number
  ) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [section]: updated } as CVFormData));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 bg-white rounded-lg shadow-xl p-6 w-full max-w-xl overflow-y-auto"
      onSubmit={(e: FormEvent) => e.preventDefault()}
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Edit CV Information</h2>

      {/* Photo */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        {formData.photo && (
          <img src={formData.photo} alt="Preview" className="mt-2 w-24 object-cover rounded border" />
        )}
      </div>

      {/* Basic Fields */}
      {["name", "email", "phone", "linkedin", "portfolio"].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize text-gray-700">{field}:</label>
          <input
            type="text"
            name={field}
            value={(formData as any)[field] || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      ))}

      {/* Summary */}
      <div>
        <label className="block mb-1 text-gray-700">Summary:</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="border p-2 w-full rounded h-24 focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-700">Education</h3>
        {formData.education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 border p-3 rounded-md bg-gray-50"
          >
            {(["degree", "institution", "year"] as (keyof EducationEntry)[]).map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={edu[field] || ""}
                onChange={(e) => handleArrayChange(e, idx, field, "education")}
                className="border p-2 w-full mb-2 rounded"
              />
            ))}
            <button
              type="button"
              onClick={() => removeEntry("education", idx)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </motion.div>
        ))}
        <button
          type="button"
          onClick={() => addEntry("education", { degree: "", institution: "", year: "" })}
          className="text-blue-600 hover:underline"
        >
          + Add Education
        </button>
      </div>

      {/* Experience Section */}
      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-700">Experience</h3>
        {formData.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 border p-3 rounded-md bg-gray-50"
          >
            {(["role", "company", "duration"] as (keyof ExperienceEntry)[]).map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={exp[field] || ""}
                onChange={(e) => handleArrayChange(e, idx, field, "experience")}
                className="border p-2 w-full mb-2 rounded"
              />
            ))}
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleArrayChange(e, idx, "description", "experience")}
              className="border p-2 w-full mb-2 rounded"
            />
            <button
              type="button"
              onClick={() => removeEntry("experience", idx)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </motion.div>
        ))}
        <button
          type="button"
          onClick={() =>
            addEntry("experience", { role: "", company: "", duration: "", description: "" })
          }
          className="text-blue-600 hover:underline"
        >
          + Add Experience
        </button>
      </div>

      {/* Technical Skills */}
      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-700">Technical Skills</h3>
        <input
          type="text"
          name="technicalSkills"
          value={formData.technicalSkills.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              technicalSkills: e.target.value.split(",").map((s) => s.trim()),
            }))
          }
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Projects Section */}
      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-700">Projects</h3>
        {formData.projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 border p-3 rounded-md bg-gray-50"
          >
            {(["title", "tech", "link"] as (keyof ProjectEntry)[]).map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={proj[field] || ""}
                onChange={(e) => handleArrayChange(e, idx, field, "projects")}
                className="border p-2 w-full mb-2 rounded"
              />
            ))}
            <textarea
              placeholder="Description"
              value={proj.description}
              onChange={(e) => handleArrayChange(e, idx, "description", "projects")}
              className="border p-2 w-full mb-2 rounded"
            />
            <button
              type="button"
              onClick={() => removeEntry("projects", idx)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </motion.div>
        ))}
        <button
          type="button"
          onClick={() =>
            addEntry("projects", { title: "", tech: "", description: "", link: "" })
          }
          className="text-blue-600 hover:underline"
        >
          + Add Project
        </button>
      </div>

      {/* Save Button */}
      <div className="pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={saveToDatabase}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow-lg"
        >
          Save
        </motion.button>
      </div>
    </motion.form>
  );
}
