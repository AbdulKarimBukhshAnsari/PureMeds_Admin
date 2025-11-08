import React, { useState } from "react";
import { X, Upload } from "lucide-react";

export default function EditMedicineModal({ medicine, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    productName: medicine?.productName || "",
    chemicalName: medicine?.chemicalName || "",
    manufacturer: medicine?.manufacturer || "",
    price: medicine?.price || "",
    purpose: medicine?.purpose || "",
    availableStock: medicine?.availableStock || "",
    category: medicine?.category || "",
    sideEffects: medicine?.sideEffects || "",
    image: medicine?.image || null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Edit Medicine Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Fields */}
            <div>
              <label className="text-sm font-medium text-gray-600">Product Name</label>
              <input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Chemical Name</label>
              <input
                name="chemicalName"
                value={formData.chemicalName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Manufacturer</label>
              <input
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Purpose</label>
              <input
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Available Stock</label>
              <input
                type="number"
                name="availableStock"
                value={formData.availableStock}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Select Category</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Painkiller">Painkiller</option>
                <option value="Antiviral">Antiviral</option>
                <option value="Supplement">Supplement</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Side Effects</label>
              <input
                name="sideEffects"
                value={formData.sideEffects}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="pt-2">
            <label className="text-sm font-medium text-gray-600 block mb-2">Image</label>
            <div className="flex items-center space-x-4">
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/70 transition">
                {formData.image ? (
                  <img
                    src={
                      typeof formData.image === "string"
                        ? formData.image
                        : URL.createObjectURL(formData.image)
                    }
                    alt="Medicine"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload size={24} />
                    <span className="text-xs mt-1">Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
