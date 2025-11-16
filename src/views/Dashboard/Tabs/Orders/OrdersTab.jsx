import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle, XCircle, Clock, List, Download, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrdersDashboard } from "../../hooks/useDashboardData";
import StatCard from "../../components/StatCard";
import LoadingScreen from "../../components/LoadingScreen";
import OrdersTrendChart from "./components/OrdersTrendChart";

const OrdersTab = () => {
  const { data, loading, error } = useOrdersDashboard();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading orders dashboard data</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Orders",
      value: data.totalOrders || 0,
      icon: ShoppingCart,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Completed",
      value: data.completed || 0,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Cancelled",
      value: data.cancelled || 0,
      icon: XCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "In Progress",
      value: data.inProgress || 0,
      icon: Clock,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} delay={index * 0.1} />
        ))}
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Orders Today</p>
                <p className="text-2xl font-bold text-gray-900">{data.todayOrders || 0}</p>
              </div>
              <ShoppingCart size={32} className="text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Revenue Today</p>
                <p className="text-2xl font-bold text-gray-900">Rs. {(data.revenueToday || 0).toLocaleString()}</p>
              </div>
              <CheckCircle size={32} className="text-green-600" />
            </div>
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="space-y-3">
            <Link to="/dashboard/order-list">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
                <div className="p-2 bg-gray-200 rounded-lg group-hover:scale-110 transition-transform">
                  <List size={20} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">View All Orders</p>
                  <p className="text-sm text-gray-500">Manage all customer orders</p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/order-list">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all cursor-pointer group">
                <div className="p-2 bg-blue-200 rounded-lg group-hover:scale-110 transition-transform">
                  <Download size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Export CSV</p>
                  <p className="text-sm text-gray-500">Download order data</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl opacity-50 cursor-not-allowed">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Plus size={20} className="text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Create Manual Order</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Orders Trend Chart */}
      <OrdersTrendChart data={data.ordersTrend || []} />
    </div>
  );
};

export default OrdersTab;

