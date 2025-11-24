import React, { useState } from "react";
import {
  X,
  PillBottle,
  Building2,
  DollarSign,
  Package,
  Calendar,
  Hash,
  AlertCircle,
  QrCode,
  Shield,
  CheckCircle,
} from "lucide-react";
import { verifyMedicineByHash } from "../../../apis/Verification/verification";
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "../../../hooks/useToast/useToast";
import ToastNotification from "../../../components/ui/Alerts/ToastNotification";

const ViewMedicineModal = ({ medicine, isOpen, onClose }) => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const { getToken } = useAuth();
  const [toast, showSuccess, showError, hideToast] = useToast();

  if (!isOpen || !medicine) return null;

  const handleVerifyMedicine = async () => {
    if (!medicine.hash) {
      showError("No hash available for verification");
      return;
    }

    setIsVerifying(true);
    try {
      const token = await getToken();
      const response = await verifyMedicineByHash(medicine.hash, token);

      setVerificationResult(response.data);
      setShowVerificationModal(true);

      // Show appropriate toast based on result
      if (response.data.isValid && response.data.isDistributedByPureMeds) {
        if (response.data.isExpired) {
          showError("Medicine verified but has EXPIRED!");
        } else if (response.data.daysUntilExpiry <= 30) {
          showError(
            `Warning: Medicine expires in ${response.data.daysUntilExpiry} days`
          );
        } else {
          showSuccess("Medicine verified successfully on blockchain!");
        }
      } else {
        showError("Medicine NOT found on blockchain!");
      }
    } catch (error) {
      console.error("Verification error:", error);
      showError(error.message || "Failed to verify medicine");
    } finally {
      setIsVerifying(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCategory = (category) => {
    if (!category) return "N/A";
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" & ");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-4 rounded-t-2xl">
            <h3 className="text-xl font-semibold tracking-wide">
              Medicine Details
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition p-1 rounded-lg hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body - Scrollable content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {/* Main Grid Layout - 2 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Image and Basic Info */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Product Image */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Product Image
                    </h4>
                    <div className="flex justify-center">
                      <img
                        src={medicine.productImage}
                        alt={medicine.productName}
                        className="w-48 h-48 object-contain rounded-xl shadow-md border border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Basic Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">
                          Product Name
                        </p>
                        <p className="font-medium text-gray-900">
                          {medicine.productName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">
                          Chemical Name
                        </p>
                        <p className="font-medium text-gray-900">
                          {medicine.chemicalName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">
                          Manufacturer
                        </p>
                        <p className="font-medium text-gray-900">
                          {medicine.manufacturer}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Category</p>
                        <p className="font-medium text-gray-900">
                          {formatCategory(medicine.category)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      QR Code & Verification
                    </h4>
                    <div className="space-y-3">
                      {medicine.qrCode ? (
                        <>
                          <div className="flex justify-center p-3 bg-white rounded-lg">
                            <img
                              src={medicine.qrCode}
                              alt="Medicine QR Code"
                              className="w-32 h-32 object-contain"
                            />
                          </div>
                          <button
                            onClick={handleVerifyMedicine}
                            disabled={isVerifying}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                          >
                            <Shield className="h-4 w-4" />
                            <span>
                              {isVerifying
                                ? "Verifying..."
                                : "Verify on Blockchain"}
                            </span>
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <QrCode className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            QR Code not available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Detailed Info */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Pricing & Stock */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Pricing & Stock
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Price</p>
                        <p className="font-medium text-gray-900">
                          Rs. {medicine.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">
                          Available Stock
                        </p>
                        <p className="font-medium text-gray-900">
                          {medicine.availableStock} units
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Batch ID</p>
                        <p className="font-medium text-gray-900 font-mono text-xs">
                          {medicine.batchId}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">
                          Expiry Date
                        </p>
                        <p className="font-medium text-gray-900">
                          {formatDate(medicine.expiryDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Purpose
                    </h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {medicine.purpose}
                      </p>
                    </div>
                  </div>

                  {/* Side Effects */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Side Effects
                    </h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      {medicine.sideEffects &&
                      medicine.sideEffects.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {JSON.parse(medicine.sideEffects).map((effect, index) => (
                            <li key={index} className="text-gray-700 text-sm">
                              {effect}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No side effects listed
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      Timestamps
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Created At</p>
                        <p className="font-medium text-gray-900 text-xs">
                          {formatDate(medicine.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Updated At</p>
                        <p className="font-medium text-gray-900 text-xs">
                          {formatDate(medicine.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Verification Result Mini Modal */}
      {showVerificationModal && verificationResult && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Verification Result</h3>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className={`p-4 rounded-lg mb-4 ${
                verificationResult.isValid
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                {verificationResult.isValid ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-red-600" />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {verificationResult.isValid ? "Verified" : "Not Verified"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {verificationResult.blockchainVerification?.isValid
                      ? "✓ Confirmed on blockchain"
                      : "⚠ Not found on blockchain"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Batch ID:</span>
                <span className="font-medium">
                  {verificationResult.batchId || medicine.batchId}
                </span>
              </div>
              {verificationResult.registeredAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Registered:</span>
                  <span className="font-medium">
                    {new Date(
                      verificationResult.registeredAt * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowVerificationModal(false)}
              className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastNotification
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        onClose={hideToast}
        duration={toast.duration}
      />
    </>
  );
};

export default ViewMedicineModal;
