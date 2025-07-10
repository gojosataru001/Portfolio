import React, { useState, useEffect } from "react";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import { motion, AnimatePresence } from "framer-motion";

interface NoteItem {
  title: string;
  content: string;
}

function NotesApp() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [noteBorderColor, setNoteBorderColor] = useState<string>("border-pink-400");

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote: NoteItem) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(indexToDelete: number) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className="min-h-screen bg-black/30 rounded-2xl text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg"
      >
        ✨ Notes App ✨
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl mx-auto bg-white p-4 rounded-lg shadow-lg"
      >
        <CreateArea onAdd={addNote} />
      </motion.div>

      <div className="flex flex-wrap gap-5 justify-center mt-10 px-4">
        <AnimatePresence>
          {notes.map((noteItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03 }}
              className={`relative w-[250px] min-h-[160px] bg-white text-black rounded-xl p-4 shadow-xl flex flex-col justify-between transition-all duration-500 overflow-hidden border-2 ${noteBorderColor}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-pink-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h1 className="text-lg font-semibold underline underline-offset-2">
                  {noteItem.title}
                </h1>
              </div>
              <p className="text-base whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal hover:overflow-visible transition-all">
                {noteItem.content}
              </p>
              <motion.button
                onClick={() => deleteNote(index)}
                className="absolute bottom-2 right-2 text-pink-500 w-8 h-8 flex items-center justify-center hover:text-pink-600"
                whileHover={{ scale: 1.3, rotate: 20 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NotesApp;
