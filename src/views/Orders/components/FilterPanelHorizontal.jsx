import React from "react";
import { Filter, X } from "lucide-react";
import CustomDropdown from "../../../components/ui/Dropdown/CustomDropdown";

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "returned", label: "Returned" },
];

const FilterPanelHorizontal = ({ filters, onFilterChange, onClearFilters }) => {
  const hasActiveFilters = filters.status || filters.batchId;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-hover flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <CustomDropdown
            value={filters.status || ""}
            onChange={(e) => onFilterChange("status", e.target.value)}
            options={statusOptions}
            placeholder="All Status"
            id="status-filter"
          />
        </div>

        {/* Batch ID Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batch ID
          </label>
          <input
            type="text"
            placeholder="Filter by batch ID"
            value={filters.batchId || ""}
            onChange={(e) => onFilterChange("batchId", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50/50 text-gray-900 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanelHorizontal;
