import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            PureMeds
          </h1>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full max-w-xs mx-auto"
        />
        <p className="text-gray-600 mt-4 text-sm">Loading dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

