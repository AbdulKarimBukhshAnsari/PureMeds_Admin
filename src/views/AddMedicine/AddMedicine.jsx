import { Upload, Package, FlaskConical, Building2, DollarSign, Package2, Tag, FileText, AlertCircle, Image as ImageIcon, Hash, Calendar } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import * as yup from "yup";
import Button from "../../components/ui/Buttons/Button";
import { useAuth } from "@clerk/clerk-react";
import ModalConfirmationAlert from "../../components/ui/Alerts/ModalConfirmationAlert";
import { uploadMedicine } from "../../apis/UploadMedicines/uploadMedicines";
import ToastNotification from "../../components/ui/Alerts/ToastNotification";
import { useToast } from "../../hooks/useToast/useToast";
import DatePicker from "../../components/ui/DatePicker/DatePicker";
import CustomDropdown from "../../components/ui/Dropdown/CustomDropdown";

// Validation schema
const validationSchema = yup.object().shape({
  productName: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  chemicalName: yup
    .string()
    .required("Chemical name is required")
    .min(2, "Chemical name must be at least 2 characters"),
  manufacturer: yup
    .string()
    .required("Manufacturer is required")
    .min(2, "Manufacturer name must be at least 2 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError("Price must be a valid number"),
  purpose: yup
    .string()
    .required("Purpose is required")
    .min(10, "Purpose must be at least 10 characters"),
  availableStock: yup
    .number()
    .required("Available stock is required")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .typeError("Stock must be a valid number"),
  category: yup
    .string()
    .required("Category is required"),
  batchId: yup
    .string()
    .required("Batch ID is required")
    .matches(/^PM-\d+$/, "Batch ID must be in format PM-{number} (e.g., PM-12345)"),
  expiryDate: yup
    .date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date must be in the future")
    .typeError("Please select a valid expiry date"),
  sideEffects: yup.string().optional(),
  productImage: yup
    .mixed()
    .required("Product image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false;
      return value instanceof File && value.type.startsWith("image/");
    })
});

function AddMedicine() {
  const [formValues, setFormValues] = useState({
    productName: "",
    chemicalName: "",
    manufacturer: "",
    price: "",
    purpose: "",
    availableStock: "",
    category: "pain-fever",
    batchId: "",
    expiryDate: null,
    sideEffects: "",
    productImage: null
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, showSuccess, showError, hideToast] = useToast();
  const [ModalData, setModalData] = useState({
    isOpen: false,
    onClose: () => {},
    onConfirm: () => {},
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    confirmVariant: "",
    cancelVariant: ""
  });
  const { getToken } = useAuth();
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value
    }));

    // Clear the error for this field on change
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormValues((prev) => ({ ...prev, productImage: file }));

      if (errors.productImage) {
        setErrors((prev) => ({ ...prev, productImage: undefined }));
      }
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const resetForm = () => {
    setFormValues({
      productName: "",
      chemicalName: "",
      manufacturer: "",
      price: "",
      purpose: "",
      availableStock: "",
      category: "pain-fever",
      batchId: "",
      expiryDate: null,
      sideEffects: "",
      productImage: null
    });
    setPreview(null);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadMedicine = async (formData) => {
    try {
      const token = await getToken({ template: "puremeds" });
      const response = await uploadMedicine(formData, token);
      showSuccess("Medicine uploaded successfully");
      console.log("Upload response:", response);
      resetForm();
    } catch (error) {  
      showError(error?.response?.data?.message);
      console.error("Error uploading medicine:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valuesForValidation = {
      ...formValues,
      price: formValues.price ? Number(formValues.price) : undefined,
      availableStock: formValues.availableStock ? Number(formValues.availableStock) : undefined,
      expiryDate: formValues.expiryDate ? new Date(formValues.expiryDate) : undefined
    };

    try {
      await validationSchema.validate(valuesForValidation, { abortEarly: false });
      setErrors({});
    } catch (validationError) {
      if (validationError.inner) {
        const validationErrors = {};
        validationError.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        showError("Please fill in all required fields correctly");
        return;
      }
    }

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (key === "sideEffects") {
        const sideEffectsArray = value.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
        formData.append("sideEffects", JSON.stringify(sideEffectsArray));
      } else if (key === "price" || key === "availableStock") {
        formData.append(key, Number(value));
      } else if (key === "expiryDate") {
        if (value) {
          formData.append("expiryDate", new Date(value).toISOString());
        }
      } else if (key === "productImage") {
        if (value) formData.append("productImage", value);
      } else {
        formData.append(key, value);
      }
    });

    setModalData({
      isOpen: true,
      onClose: () => setModalData((prev) => ({ ...prev, isOpen: false })),
      onConfirm: async () => handleUploadMedicine(formData),
      title: "Confirm Upload",
      message: "Are you sure you want to upload this medicine?",
      confirmText: "Yes, Upload",
      cancelText: "No, Cancel",
      confirmVariant: "primary",
      cancelVariant: "secondary",
      isAsync: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto p-5"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent inline-block ">
          Add New Medicine
        </h1>
        <p className="text-gray-600 text-lg">Fill in the details to add a new medicine to the inventory</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Basic Info */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="text-primary" size={20} />
              </div>
              <h2 className="text-3xl font-semibold text-text">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
                <label htmlFor="productName" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <Package size={16} className="text-primary" /> Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={formValues.productName}
                  onChange={handleChange}
                  placeholder="e.g. Paracetamol 500mg"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.productName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                {errors.productName && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.productName}</p>}
              </motion.div>

              {/* Chemical Name */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-2">
                <label htmlFor="chemicalName" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <FlaskConical size={16} className="text-primary" /> Chemical Name
                </label>
                <input
                  type="text"
                  id="chemicalName"
                  value={formValues.chemicalName}
                  onChange={handleChange}
                  placeholder="e.g. Acetaminophen"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.chemicalName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                {errors.chemicalName && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.chemicalName}</p>}
              </motion.div>

              {/* Manufacturer */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
                <label htmlFor="manufacturer" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <Building2 size={16} className="text-primary" /> Manufacturer
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  value={formValues.manufacturer}
                  onChange={handleChange}
                  placeholder="e.g. ABC Pharma Ltd."
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.manufacturer ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                {errors.manufacturer && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.manufacturer}</p>}
              </motion.div>

              {/* Price */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="space-y-2">
                <label htmlFor="price" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <DollarSign size={16} className="text-primary" /> Price (Rs.)
                </label>
                <input
                  type="number"
                  id="price"
                  value={formValues.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g. 150.00"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.price ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                {errors.price && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.price}</p>}
              </motion.div>

              {/* Available Stock */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
                <label htmlFor="availableStock" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <Package2 size={16} className="text-primary" /> Available Stock
                </label>
                <input
                  type="number"
                  id="availableStock"
                  value={formValues.availableStock}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g. 500"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.availableStock ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                {errors.availableStock && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.availableStock}</p>}
              </motion.div>

              {/* Category */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="space-y-2">
                <CustomDropdown
                  id="category"
                  value={formValues.category}
                  onChange={handleChange}
                  label="Category"
                  icon={Tag}
                  error={!!errors.category}
                  options={[
                    { value: "pain-fever", label: "Pain & Fever" },
                    { value: "infections", label: "Infections" },
                    { value: "heart-bp", label: "Heart & BP" },
                    { value: "lungs-allergy", label: "Lungs & Allergy" },
                    { value: "stomach-digestion", label: "Stomach & Digestion" },
                    { value: "hormones-diabetes", label: "Hormones & Diabetes" },
                    { value: "brain-mental", label: "Brain and Mental Health" },
                    { value: "vitamins-others", label: "Vitamins & Others" }
                  ]}
                />
                {errors.category && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.category}</p>}
              </motion.div>
            </div>

            {/* Batch Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
              {/* Batch ID */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
                <label htmlFor="batchId" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <Hash size={16} className="text-primary" /> Batch ID
                </label>
                <input
                  type="text"
                  id="batchId"
                  value={formValues.batchId}
                  onChange={handleChange}
                  placeholder="e.g. PM-12345"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.batchId ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                {errors.batchId && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.batchId}</p>}
                <p className="text-xs text-gray-500 mt-1">Format: PM-{"{number}"} (e.g., PM-12345)</p>
              </motion.div>

              {/* Expiry Date */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }} className="space-y-2">
                <DatePicker
                  value={formValues.expiryDate}
                  onChange={(date) => {
                    setFormValues((prev) => ({ ...prev, expiryDate: date }));
                    if (errors.expiryDate) {
                      setErrors((prev) => ({ ...prev, expiryDate: undefined }));
                    }
                  }}
                  label="Expiry Date"
                  icon={Calendar}
                  placeholder="Select expiry date"
                  error={!!errors.expiryDate}
                  minDate={new Date()}
                />
                {errors.expiryDate && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.expiryDate}</p>}
              </motion.div>
            </div>
          </div>

          {/* Medical Details Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="text-primary" size={20} />
              </div>
              <h2 className="text-3xl font-semibold text-text">Medical Details</h2>
            </div>

            <div className="space-y-6">
              {/* Purpose */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
                <label htmlFor="purpose" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <FileText size={16} className="text-primary" /> Purpose
                </label>
                <textarea
                  id="purpose"
                  value={formValues.purpose}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What is this medicine used for? Describe the medical purpose..."
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white resize-none ${
                    errors.purpose ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                {errors.purpose && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{errors.purpose}</p>}
              </motion.div>

              {/* Side Effects */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="space-y-2">
                <label htmlFor="sideEffects" className="flex items-center gap-2 text-md font-semibold text-gray-700">
                  <AlertCircle size={16} className="text-primary" /> Side Effects
                </label>
                <textarea
                  id="sideEffects"
                  value={formValues.sideEffects}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white resize-none"
                  placeholder="List possible side effects (e.g., nausea, dizziness, headache)"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple side effects with commas</p>
              </motion.div>
            </div>
          </div>

          {/* Product Image Section */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ImageIcon className="text-primary" size={20} />
              </div>
              <h2 className="text-3xl font-semibold text-text">Product Image</h2>
            </div>

            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
              errors.productImage ? "border-red-500 bg-red-50/50" : "border-gray-500"
            }`}>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              {!preview ? (
                <div className="flex flex-col items-center">
                  <Upload size={36} className={`mb-2 ${errors.productImage ? "text-red-400" : "text-gray-400"}`} />
                  <p className={`mb-2 ${errors.productImage ? "text-red-600" : "text-gray-500"}`}>Drag and drop an image or click to browse</p>
                  <Button variant="outline" size="sm" type="button" onClick={openFilePicker}>Upload Image</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img src={preview} alt="preview" className="h-60 w-96 object-cover rounded-md mb-3" />
                  <Button variant="outline" size="sm" type="button" onClick={openFilePicker}>Change Image</Button>
                </div>
              )}
            </div>
            {errors.productImage && <p className="text-sm text-red-600 flex items-center gap-1 mt-2"><AlertCircle size={14} />{errors.productImage}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex justify-end gap-4 mt-8">
          <Button variant="secondary" size="lg" type="button" onClick={resetForm} className="px-8">Reset Form</Button>
          <Button variant="primary" size="lg" type="submit" className="px-8 shadow-lg hover:shadow-xl transition-shadow">Add Medicine</Button>
        </motion.div>
      </form>

      <ModalConfirmationAlert {...ModalData} />
      <ToastNotification
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        duration={toast.duration}
        onClose={hideToast}
      />
    </motion.div>
  );
}

export default AddMedicine;
