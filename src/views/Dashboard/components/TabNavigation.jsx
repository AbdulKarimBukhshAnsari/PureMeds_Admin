import React from "react";
import { motion } from "framer-motion";

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-6">
      <div className="flex flex-wrap gap-2 justify-between">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onTabChange(tab.id)}
            className={`cursor-pointer px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 relative ${
              activeTab === tab.id
                ? "text-primary-hover bg-[#deefec]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <tab.icon size={18} />}
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
