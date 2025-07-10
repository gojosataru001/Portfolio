import React from "react";
import { Button } from "../components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black/30 via-gray-900/30 to-gray-800/30 text-white font-sans rounded-xl overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 md:px-20 py-24 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Hi, I'm Ajay Sharma
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-300 max-w-xl"
        >
          A Full-Stack Developer passionate about crafting clean, efficient, and scalable apps.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-medium transition-all shadow-md">
            Download Resume
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-lg text-base font-medium transition-all shadow-md"
          >
            View Projects
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex space-x-6 mt-10"
        >
          <a href="https://github.com" target="_blank"><Github className="w-6 h-6 hover:text-blue-400 transition-transform hover:scale-110" /></a>
          <a href="https://linkedin.com" target="_blank"><Linkedin className="w-6 h-6 hover:text-blue-400 transition-transform hover:scale-110" /></a>
          <a href="mailto:you@example.com"><Mail className="w-6 h-6 hover:text-blue-400 transition-transform hover:scale-110" /></a>
        </motion.div>
      </section>

      {/* Background Blur Shapes */}
      <div className="absolute top-[-100px] right-[-100px] w-[200px] h-[200px] bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-[-120px] left-[-80px] w-[200px] h-[200px] bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse z-0"></div>

      {/* Floating Tags */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 px-6 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion", "MySQL", "JavaScript"].map((tech, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded-full backdrop-blur hover:bg-white/20 transition"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
