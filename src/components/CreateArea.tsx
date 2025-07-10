import React, { useState } from "react";
import { MdAddTask } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    const capitalizedValue =
      name === "title"
        ? value
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")
        : value;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: capitalizedValue,
    }));
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <AnimatePresence>
      <motion.form
        onSubmit={submitNote}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="create-note bg-white rounded-lg p-6 shadow-md w-full max-w-xl mx-auto"
      >
        {isExpanded && (
          <motion.input
            key="title"
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full mb-3 px-4 py-2 text-lg text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}

        <motion.textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          className="w-full px-4 py-2 text-lg text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {isExpanded && (
          <motion.button
            type="submit"
            className="mt-3 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdAddTask className="text-xl" />
          </motion.button>
        )}
      </motion.form>
    </AnimatePresence>
  );
}

export default CreateArea;
