import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  age: string;
  gender: string;
  terms: boolean;
}

interface Submission extends FormData {
  id: number;
}

export default function FormApp() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    gender: "",
    terms: false,
  });

  const [submissions, setSubmissions] = useState<Submission[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;

    const fieldValue =
    type === "checkbox" && "checked" in e.target
      ? (e.target as HTMLInputElement).checked
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmissions([...submissions, { ...formData, id: Date.now() }]);
    setFormData({ name: "", email: "", age: "", gender: "", terms: false });
  }

  function handleDelete(id: number) {
    setSubmissions(submissions.filter((entry) => entry.id !== id));
  }

  return (
    <div className="min-h-screen bg-black/30 rounded-2xl p-4 text-white font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mt-20 mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Registration Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            required
          >
            <option value="" className="font-bold text-black">Select Gender</option>
            <option value="male" className="font-bold text-black">Male</option>
            <option value="female" className="font-bold text-black">Female</option>
            <option value="other" className="font-bold text-black">Other</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>

      {submissions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">Submitted Data</h2>
          <ul className="space-y-2">
            {submissions.map((entry) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-white/5 border border-white/20 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-white">{entry.name}</p>
                  <p className="text-sm text-gray-300">
                    {entry.email}, Age: {entry.age}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-400 hover:text-red-600 font-semibold"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
