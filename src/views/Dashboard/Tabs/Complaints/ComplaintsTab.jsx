import React from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, XCircle, List, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useComplaintsDashboard } from "../../hooks/useDashboardData";
import StatCard from "../../components/StatCard";
import LoadingScreen from "../../components/LoadingScreen";
import ComplaintsPieChart from "./components/ComplaintsPieChart";
import LatestComplaintsTable from "./components/LatestComplaintsTable";

const ComplaintsTab = () => {
  const { data, loading, error } = useComplaintsDashboard();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading complaints dashboard data</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Complaints",
      value: data.totalComplaints || 0,
      icon: FileText,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending",
      value: data.pending || 0,
      icon: Clock,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Resolved",
      value: data.resolved || 0,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Rejected",
      value: data.rejected || 0,
      icon: XCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} delay={index * 0.1} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/dashboard/alert-list">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
              <div className="p-2 bg-gray-200 rounded-lg group-hover:scale-110 transition-transform">
                <List size={20} className="text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View Complaint List</p>
                <p className="text-sm text-gray-500">Browse all complaints</p>
              </div>
            </div>
          </Link>
          <Link to="/dashboard/alert-list">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all cursor-pointer group">
              <div className="p-2 bg-blue-200 rounded-lg group-hover:scale-110 transition-transform">
                <Edit size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Resolve / Add Remark</p>
                <p className="text-sm text-gray-500">Manage complaints</p>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <ComplaintsPieChart data={data.statusDistribution || []} />
        
        {/* Latest Complaints Table */}
        <LatestComplaintsTable complaints={data.latestComplaints || []} />
      </div>
    </div>
  );
};

export default ComplaintsTab;

