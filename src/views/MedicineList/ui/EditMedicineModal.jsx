import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

export default function EditMedicineModal({
  medicine,
  isOpen,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    productName: "",
    chemicalName: "",
    manufacturer: "",
    price: "",
    purpose: "",
    availableStock: "",
    category: "",
    sideEffects: "",
    image: null,
  });

  // update form data when medicine changes
  useEffect(() => {
    if (medicine) {
      setFormData({
        productName: medicine.productName || "",
        chemicalName: medicine.chemicalName || "",
        manufacturer: medicine.manufacturer || "",
        price: medicine.price || "",
        purpose: medicine.purpose || "",
        availableStock: medicine.availableStock || "",
        category: medicine.category || "",
        // sideEffects:
        //   typeof medicine.sideEffects === "string"
        //     ? medicine.sideEffects
        //         .replace(/[\[\]"]+/g, "") // remove [ ] and "
        //         .split(",")
        //         .map((s) => s.trim())
        //         .join(", ")
        //     : Array.isArray(medicine.sideEffects)
        //     ? medicine.sideEffects.join(", ")
        //     : "",
        // these keep coming in the form of a list, despite chnaging their format, please correct, otherwise remove 
        image: medicine.image || null,
      });
    }
  }, [medicine]);

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
    const formattedData = {
      ...formData,
      // ✅ convert comma-separated string back to array (if needed)
      sideEffects: formData.sideEffects
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };
    onSave(formattedData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-[#f9fafb]">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Medicine Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "productName", label: "Product Name" },
              { name: "chemicalName", label: "Chemical Name" },
              { name: "manufacturer", label: "Manufacturer" },
              { name: "price", label: "Price ($)", type: "number" },
              { name: "purpose", label: "Purpose" },
              {
                name: "availableStock",
                label: "Available Stock",
                type: "number",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-medium text-gray-600">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156874]/40 focus:border-[#156874] outline-none transition"
                />
              </div>
            ))}

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156874]/40 focus:border-[#156874] outline-none transition"
              >
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

            {/* Side Effects */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Side Effects
              </label>
              <input
                name="sideEffects"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156874]/40 focus:border-[#156874] outline-none transition"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#156874]/70 transition">
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
                    <Upload size={22} />
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

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-white font-medium bg-[#156874] hover:bg-[#125e66] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
