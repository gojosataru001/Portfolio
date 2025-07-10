import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black/70 backdrop-blur-md text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        
        {/* Left: Logo / Name */}
        <div>
          <h1 className="text-xl font-bold">Ajay Sharma Portfolio</h1>
          <p className="text-sm text-gray-300 mt-1">Full-Stack Developer • React & Node.js</p>
        </div>

        {/* Middle: Quick Links */}
        <div className="space-y-2">
          <h2 className="font-semibold">Quick Links</h2>
          <ul className="text-sm text-gray-300 space-y-1">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#skills" className="hover:text-white">Skills</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Right: Social Media */}
        <div className="space-y-2">
          <h2 className="font-semibold">Connect</h2>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-300">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
            <a href="mailto:you@example.com" className="hover:text-white">Email</a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-white/10 pt-4 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Ajay Sharma. All rights reserved.
      </div>
    </footer>
  );
}
