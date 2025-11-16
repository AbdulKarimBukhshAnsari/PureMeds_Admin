import React from "react";
import { AlertTriangle } from "lucide-react";

const BatchAlertWarning = ({ count }) => {
  if (count < 3) return null;

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <AlertTriangle size={20} className="text-red-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-900 mb-1">
            Multiple Complaints Detected
          </h4>
          <p className="text-sm text-red-700">
            {count} complaint{count > 1 ? "s" : ""} detected for this batch. Please review carefully.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatchAlertWarning;

