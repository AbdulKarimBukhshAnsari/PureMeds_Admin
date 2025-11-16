import React from "react";
import { motion } from "framer-motion";
import { Package, AlertCircle, XCircle, Calendar, PlusCircle, List, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useMedicinesDashboard } from "../../hooks/useDashboardData";
import StatCard from "../../components/StatCard";
import LoadingScreen from "../../components/LoadingScreen";
import StockDistributionChart from "./components/StockDistributionChart";
import CategoryWiseChart from "./components/CategoryWiseChart";

const MedicinesTab = () => {
  const { data, loading, error } = useMedicinesDashboard();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading medicines dashboard data</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Medicines",
      value: data.totalMedicines || 0,
      icon: Package,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Low Stock",
      value: data.lowStock || 0,
      icon: AlertCircle,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Out of Stock",
      value: data.outOfStock || 0,
      icon: XCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Expired",
      value: data.expired || 0,
      icon: Calendar,
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    {
      title: "Expiring Soon",
      value: data.expiringSoon || 0,
      icon: AlertTriangle,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Medicine Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} delay={index * 0.1} />
        ))}
      </div>

      {/* Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Shortcuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/dashboard/add-medicine">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl hover:from-primary/10 hover:to-primary/15 transition-all cursor-pointer group">
              <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                <PlusCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Add New Medicine</p>
                <p className="text-sm text-gray-500">Add product to inventory</p>
              </div>
            </div>
          </Link>
          <Link to="/dashboard/medicine-list">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
              <div className="p-2 bg-gray-200 rounded-lg group-hover:scale-110 transition-transform">
                <List size={20} className="text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View Medicine List</p>
                <p className="text-sm text-gray-500">Browse all medicines</p>
              </div>
            </div>
          </Link>
          <Link to="/dashboard/alert-list">
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all cursor-pointer group">
              <div className="p-2 bg-orange-200 rounded-lg group-hover:scale-110 transition-transform">
                <AlertTriangle size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Stock Alerts</p>
                <p className="text-sm text-gray-500">View low stock items</p>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockDistributionChart data={data.stockDistribution || {}} />
        <CategoryWiseChart data={data.categoryWise || []} />
      </div>
    </div>
  );
};

export default MedicinesTab;

