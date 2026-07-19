"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const StreamingUI = () => {
  return (
    <div className="flex items-center gap-1 mt-2">
      <motion.div
        className="w-1.5 h-1.5 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-1.5 h-1.5 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-1.5 h-1.5 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};
