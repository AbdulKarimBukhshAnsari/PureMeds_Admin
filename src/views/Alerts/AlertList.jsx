import React, { useState, useEffect } from "react";
import { AlertModal } from "./ui/AlertModal";
import {
  Search,
  Filter,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { mockAlerts } from "../../utils/mockData";

export function AlertList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search with animation
  useEffect(() => {
    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const filtered = mockAlerts.filter(
        (alert) =>
          alert.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.alertID.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAlerts(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
              Alert Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor and manage medication alerts
            </p>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by medicine, manufacturer, city, or alert ID"
                  className="pl-12 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="relative overflow-hidden">
            {/* Loading Animation */}
            {isSearching && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  Searching...
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-y border-gray-200">
                  <tr>
                    <th className="py-5 px-7 font-semibold text-gray-700 text-md uppercase tracking-wider">
                      Alert ID
                    </th>
                    <th className="py-5 px-7 font-semibold text-gray-700 text-md uppercase tracking-wider">
                      Medicine
                    </th>
                    <th className="py-5 px-7 font-semibold text-gray-700 text-md uppercase tracking-wider">
                      Manufacturer
                    </th>
                    <th className="py-5 px-7 font-semibold text-gray-700 text-md uppercase tracking-wider">
                      City 
                    </th>
                    <th className="py-5 px-7 font-semibold text-gray-700 text-md uppercase tracking-wider">
                      QR Code
                    </th>
                    <th className="py-5 px-7 font-semibold text-gray-700 text-md uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAlerts.map((alert, index) => (
                    <tr
                      key={alert.alertID}
                      className="hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        animation: "slideInUp 0.3s ease-out forwards",
                      }}
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-md font-medium text-gray-900">
                            {alert.alertID}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="font-medium text-gray-900">
                          {alert.medicineName}
                        </div>
                        <div className="text-md text-gray-500 mt-1">
                          {alert.medicineDose}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-gray-700">
                          {alert.manufacturer}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-md text-gray-600  rounded-lg">
                          {alert.city}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="transform transition-transform duration-200 group-hover:scale-110">
                          <img
                            src={alert.qrCode}
                            alt="QR Code"
                            className="w-12 h-12 object-contain rounded-lg shadow-md border border-gray-200"
                          />
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <button
                          onClick={() => handleViewAlert(alert)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transform transition-all duration-200 hover:scale-105 hover:shadow-md group/btn"
                        >
                          Details
                          <ExternalLink
                            size={14}
                            className="group-hover/btn:translate-x-0.5 transition-transform"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredAlerts.length === 0 && !isSearching && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg mb-2">No alerts found</p>
                <p className="text-gray-400">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedAlert && (
          <AlertModal
            alert={selectedAlert}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
