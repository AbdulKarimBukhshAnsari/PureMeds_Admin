import React, { useState } from "react";
import {
  X as CloseIcon,
  Calendar,
  Hash,
  MapPin,
  Store,
  PillBottle,
  Weight,
  Building2,
  Shield,
  CheckCircle,
  AlertCircle,
  QrCode,
} from "lucide-react";
import { verifyMedicineByQRCode } from "../../../apis/Verification/verification";
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "../../../hooks/useToast/useToast";
import ToastNotification from "../../../components/ui/Alerts/ToastNotification";

export function AlertModal({ alert, isOpen, onClose }) {
  const [showVerificationResult, setShowVerificationResult] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const { getToken } = useAuth();
  const [toast, showSuccess, showError, hideToast] = useToast();
  
  if (!isOpen) return null;

  const handleVerifyQR = async () => {
    if (!alert.qrCode) {
      showError("No QR code available for verification");
      return;
    }
    
    setIsVerifying(true);
    try {
      // Convert base64 or URL to blob for verification
      const response = await fetch(alert.qrCode);
      const blob = await response.blob();
      const file = new File([blob], "qr-code.png", { type: "image/png" });
      
      const token = await getToken();
      const verifyResponse = await verifyMedicineByQRCode(file, token);
      
      setVerificationResult(verifyResponse.data);
      setShowVerificationResult(true);
      
      // Show appropriate toast
      if (verifyResponse.data.isValid && verifyResponse.data.isDistributedByPureMeds) {
        showSuccess("Medicine verified - Complaint is about authentic medicine");
      } else {
        showError("FAKE medicine detected - Complaint is valid!");
      }
    } catch (error) {
      console.error("Error verifying QR:", error);
      showError(error.message || "Failed to verify QR code");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex justify-between items-center bg-primary text-white px-6 py-4">
            <h3 className="text-lg md:text-xl font-semibold tracking-wide">
              Alert Details – {alert.alertID}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Medicine Info Card */}
              <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="text-lg font-semibold text-support mb-4">
                  Medicine Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md">
                  <div className="flex items-start space-x-2">
                    <PillBottle size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">Medicine Name</p>
                      <p className="font-medium">{alert.medicineName}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Weight size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">Dose</p>
                      <p className="font-medium">{alert.medicineDose}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Building2 size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">Manufacturer</p>
                      <p className="font-medium">{alert.manufacturer}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Hash size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">Batch ID</p>
                      <p className="font-medium">{alert.batchId}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">Manufacturing Date</p>
                      <p className="font-medium">{alert.manufacturerDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">Expiry Date</p>
                      <p className="font-medium">{alert.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complaint + QR Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="text-lg font-semibold text-support mb-4">
                  Complaint Info
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Store size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">Store Name</p>
                      <p className="font-medium">{alert.store}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-gray-500">City</p>
                      <p className="font-medium">{alert.city}</p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <p className="text-gray-500 mb-2">QR Code</p>
                    {alert.qrCode ? (
                      <>
                        <div className="border border-gray-200 rounded-lg p-3 flex justify-center bg-white">
                          <img
                            src={alert.qrCode}
                            alt="QR Code"
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                        <button
                          onClick={handleVerifyQR}
                          disabled={isVerifying}
                          className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          <Shield className="h-4 w-4" />
                          <span>{isVerifying ? "Verifying..." : "Verify QR Code"}</span>
                        </button>
                      </>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-6 bg-white text-center">
                        <QrCode className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No QR code provided</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-support hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Result Modal */}
      {showVerificationResult && verificationResult && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">QR Verification Result</h3>
              <button
                onClick={() => setShowVerificationResult(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            
            <div className={`p-4 rounded-lg mb-4 ${
              verificationResult.isValid && verificationResult.isDistributedByPureMeds
                ? "bg-green-50 border border-green-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              <div className="flex items-center space-x-3">
                {verificationResult.isValid && verificationResult.isDistributedByPureMeds ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">
                        Medicine Verified
                      </p>
                      <p className="text-sm text-green-700">
                        This is an authentic PureMeds product
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-800">
                        ⚠️ Fake Medicine Alert
                      </p>
                      <p className="text-sm text-red-700">
                        This complaint is valid - medicine is counterfeit
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Blockchain Status */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className={`h-5 w-5 ${
                  verificationResult.blockchainVerification?.isValid 
                    ? "text-blue-600" 
                    : "text-gray-400"
                }`} />
                <p className="text-sm font-medium text-gray-700">
                  Blockchain: {
                    verificationResult.blockchainVerification?.isValid
                      ? "✓ Verified"
                      : "✗ Not found"
                  }
                </p>
              </div>
            </div>
            
            {/* Medicine Details */}
            {verificationResult.product && (
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Product:</span>
                  <span className="font-medium">{verificationResult.product.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Batch ID:</span>
                  <span className="font-medium font-mono text-xs">
                    {verificationResult.product.batchId}
                  </span>
                </div>
                {verificationResult.isExpired && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-700 text-xs font-medium">
                      ⚠️ Medicine has EXPIRED
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={() => setShowVerificationResult(false)}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
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
}

export default AlertModal;