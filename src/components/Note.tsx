import React from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Note({ id, title, content, index, onDelete }) {
  const handleClick = () => {
    onDelete(id);
  };

  return (
    <Tippy
      content={<span className="whitespace-pre-wrap text-sm text-white">{content}</span>}
      placement="top"
      animation="shift-away"
      delay={[300, 0]}
      theme="light"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.03 }}
        className="relative  bg-white text-black rounded-xl p-4 shadow-lg flex flex-col justify-between border-2 border-pink-400"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-pink-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm">
            {index}
          </div>
          <h1 className="text-lg font-semibold underline underline-offset-2">
            {title}
          </h1>
        </div>
        <p className="text-base text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
          {content}
        </p>
        <motion.button
          onClick={handleClick}
          className="absolute bottom-2 right-2 text-pink-500 hover:text-pink-600 w-8 h-8 flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 20 }}
          whileTap={{ scale: 0.9 }}
        >
          <MdDelete className="text-2xl" />
        </motion.button>
      </motion.div>
    </Tippy>
  );
}

export default Note;
