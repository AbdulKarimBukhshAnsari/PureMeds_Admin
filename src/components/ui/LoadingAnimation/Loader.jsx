import React from 'react'
import { motion } from "framer-motion";

function Loader() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
      {/* Logo Text */}
      <div className="flex items-center space-x-1">
        <span className="text-5xl font-bold text-primary">Pure Meds</span>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-[3px] bg-gray-300 mt-6 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-primary"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "0%", "100%"] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
    </div>
  )
}

export default Loader

