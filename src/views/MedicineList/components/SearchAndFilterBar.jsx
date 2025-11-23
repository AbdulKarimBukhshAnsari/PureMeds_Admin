import React from "react";
import { Search } from "lucide-react";
import CustomDropdown from "../../../components/ui/Dropdown/CustomDropdown";

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "pain-fever", label: "Pain & Fever" },
  { value: "infections", label: "Infections" },
  { value: "heart-bp", label: "Heart & BP" },
  { value: "lungs-allergy", label: "Lungs & Allergy" },
  { value: "stomach-digestion", label: "Stomach & Digestion" },
  { value: "hormones-diabetes", label: "Hormones & Diabetes" },
  { value: "brain-mental", label: "Brain & Mental" },
  { value: "vitamins-others", label: "Vitamins & Others" },
];

const SearchAndFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search Input */}
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

        {/* Category Filter*/}
        <div className="w-full sm:w-auto">
          <CustomDropdown
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={categoryOptions}
            placeholder="All Categories"
            id="category-filter"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
