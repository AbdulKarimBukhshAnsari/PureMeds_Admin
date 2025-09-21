import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import Button from "../../components/ui/Buttons/Button";
import axios from "axios";


function AddMedicine() {
  const [preview, setPreview] = useState(null);
  const [img, setImg] = useState(null);
  //   const [product, setProduct] = useState() // needed incase we set product details and handle the post logic seperately.
  const fileInputRef = useRef();

//   function for handling image upload 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // for preview
      setImg(fileInputRef.current.files[0]);
      // TODO: Upload to backend here
    }
  };
  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

//   function for handling form submission 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("productName", document.getElementById("productName").value);
    formData.append("chemicalName", document.getElementById("chemicalName").value);
    formData.append("manufacturer", document.getElementById("manufacturer").value);
    formData.append("price", Number(document.getElementById("price").value));
    formData.append("purpose", document.getElementById("purpose").value);
    formData.append("availableStock", Number(document.getElementById("availableStock").value));
    formData.append("category", document.getElementById("category").value);

    const sideEffects = document
      .getElementById("sideEffects")
      .value.split(",")
      .map((s) => s.trim());
    formData.append("sideEffects", JSON.stringify(sideEffects));

    if (img) {
      formData.append("productImage", img); 
    }

    // POST to backend, TBD (to be done)
  } catch (err) {
    console.error("❌ Error adding medicine:", err);
    alert("Failed to add medicine. Please try again.");
  }
};


  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Add New Medicine</h1>
        <p className="text-gray-600">Enter medicine details</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Paracetamol 500mg"
              />
            </div>

            {/* Chemical Name */}
            <div>
              <label
                htmlFor="chemicalName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Chemical Name
              </label>
              <input
                type="text"
                id="chemicalName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Acetaminophen"
              />
            </div>

            {/* Manufacturer */}
            <div>
              <label
                htmlFor="manufacturer"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Manufacturer
              </label>
              <input
                type="text"
                id="manufacturer"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. ABC Pharma Ltd."
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (Rs.)
              </label>
              <input
                type="number"
                id="price"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. 150"
              />
            </div>

            {/* Available Stock */}
            <div>
              <label
                htmlFor="availableStock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Available Stock
              </label>
              <input
                type="number"
                id="availableStock"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. 500"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="pain-fever">Pain & Fever</option>
                <option value="infections">Infections</option>
                <option value="heart-bp">Heart & BP</option>
                <option value="lungs-allergy">Lungs & Allergy</option>
                <option value="stomach-digestion">Stomach & Digestion</option>
                <option value="hormones-diabetes">Hormones & Diabetes</option>
                <option value="brain-mental">Brain and Mental Health</option>
                <option value="vitamins-others">Vitamins & Others</option>
              </select>
            </div>
          </div>

          {/* Purpose */}
          <div className="mb-6">
            <label
              htmlFor="purpose"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Purpose
            </label>
            <textarea
              id="purpose"
              rows={2}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="What is this medicine used for?"
            ></textarea>
          </div>

          {/* Side Effects */}
          <div className="mb-6">
            <label
              htmlFor="sideEffects"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Side Effects
            </label>
            <textarea
              id="sideEffects"
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="List possible side effects, separated by commas"
            ></textarea>
          </div>

          {/* Product Image */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              {!preview ? (
                <div className="flex flex-col items-center">
                  <Upload size={36} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-2">
                    Drag and drop an image or click to browse
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={openFilePicker}
                  >
                    Upload Image
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img
                    src={preview}
                    alt="preview"
                    className="h-60 w-96 object-cover rounded-md mb-3"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={openFilePicker}
                  >
                    Change Image
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Add Medicine</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMedicine;
