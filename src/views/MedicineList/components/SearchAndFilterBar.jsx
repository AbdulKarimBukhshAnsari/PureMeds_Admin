import React from "react";
import { Search } from "lucide-react";

const SearchAndFilterBar = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }) => {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search medicines..."
            className="pl-12 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50/50"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-auto">
          <select
            className="w-full sm:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50/50 cursor-pointer"
            value={selectedCategory}
            onChange={(e) => {
              onCategoryChange(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            <option value="pain-fever">Pain & Fever</option>
            <option value="infections">Infections</option>
            <option value="heart-bp">Heart & BP</option>
            <option value="lungs-allergy">Lungs & Allergy</option>
            <option value="stomach-digestion">Stomach & Digestion</option>
            <option value="hormones-diabetes">Hormones & Diabetes</option>
            <option value="brain-mental">Brain & Mental</option>
            <option value="vitamins-others">Vitamins & Others</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;

