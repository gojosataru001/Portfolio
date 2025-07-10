import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen rounded-2xl bg-black/40 text-white px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-10"
        >
          About Me
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2"
          >
            <img
              src="/Ajay_profile.png"
              alt="Ajay profile"
              className="rounded-2xl shadow-lg w-75 object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2"
          >
            <p className="text-lg leading-relaxed text-gray-100 mb-4">
              Hi, I'm <span className="font-semibold text-white">Ajay Sharma</span>, a Full-Stack Developer passionate about creating clean, modern, and high-performance web applications. With a strong foundation in the MERN stack, I love crafting interactive UIs and scalable backends.
            </p>
            <p className="text-lg leading-relaxed text-gray-100 mb-4">
              I'm currently pursuing my BCA and working at a startup where I build real-world projects, learning fast and delivering faster. I enjoy solving problems, improving UX, and exploring frontend frameworks and design systems.
            </p>
            <p className="text-lg leading-relaxed text-gray-100">
              Beyond code, I'm a big fan of anime, tech tutorials, and self-improvement books. I aim to build products that matter, and someday, launch my own tech venture.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
            {["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "MySQL", "Tailwind CSS", "Git & GitHub"].map((skill, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md hover:bg-white/20 transition"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="/#projects"
            className="inline-block bg-white text-pink-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Explore My Projects
          </a>
        </motion.div>
      </div>
    </div>
  );
}
