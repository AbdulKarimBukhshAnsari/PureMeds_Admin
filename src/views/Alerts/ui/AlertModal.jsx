import React from "react";
import {
  X as CloseIcon,
  Calendar,
  Hash,
  MapPin,
  Store,
  PillBottle,
  Weight,
  Building2,
} from "lucide-react";

export function AlertModal({ alert, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
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
                  <div className="border border-gray-200 rounded-lg p-3 flex justify-center">
                    <img
                      src={alert.qrCode}
                      alt="QR Code"
                      className="w-32 h-32 object-contain"
                    />
                  </div>
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
  );
}
