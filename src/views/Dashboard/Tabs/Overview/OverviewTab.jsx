import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  DollarSign,
  AlertCircle,
  PlusCircle,
  List,
  ShoppingCart,
  FileText,
  Activity,
  BarChart3,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardOverview } from "../../hooks/useDashboardData";
import StatCard from "../../components/StatCard";
import LoadingScreen from "../../components/LoadingScreen";
import CategoryChart from "./components/CategoryChart";
import QuickOverviewCards from "./components/QuickOverviewCards";

const OverviewTab = () => {
  const { data, loading, error } = useDashboardOverview();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading dashboard data</p>
      </div>
    );
  }

  const categoryNames = {
    "pain-fever": "Pain & Fever",
    infections: "Infections",
    "heart-bp": "Heart & BP",
    "lungs-allergy": "Lungs & Allergy",
    "stomach-digestion": "Stomach & Digestion",
    "hormones-diabetes": "Hormones & Diabetes",
    "brain-mental": "Brain & Mental",
    "vitamins-others": "Vitamins & Others",
  };

  const statCards = [
    {
      title: "Total Medicines",
      value: data.totalMedicines || 0,
      icon: Package,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Low Stock Items",
      value: data.lowStockCount || 0,
      icon: AlertCircle,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      change: data.lowStockCount > 0 ? "Action Needed" : "All Good",
      trend: data.lowStockCount > 0 ? "down" : "up",
    },
    {
      title: "Active Alerts",
      value: data.totalAlerts || 0,
      icon: AlertTriangle,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      change: "+5",
      trend: "up",
    },
    {
      title: "Inventory Value",
      value: `Rs. ${(data.totalValue || 0).toLocaleString()}`,
      icon: DollarSign,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      change: "+8.2%",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} delay={index * 0.1} />
        ))}
      </div>

      {/* Quick Overviews */}
      <QuickOverviewCards
        todayOrders={data.todayOrders || 0}
        pendingComplaints={data.pendingComplaints || 0}
        expiringSoon={data.expiringSoon || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="text-primary" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>

          <div className="flex flex-col flex-1 gap-4">
            <Link to="/dashboard/add-medicine" className="flex-1">
              <div className="flex items-center gap-4 p-4 h-full bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl hover:from-primary/10 hover:to-primary/15 transition-all cursor-pointer group">
                <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                  <PlusCircle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Add New Medicine
                  </p>
                  <p className="text-sm text-gray-500">
                    Add a new product to inventory
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-gray-400 group-hover:text-primary transition-colors"
                />
              </div>
            </Link>

            <Link to="/dashboard/medicine-list" className="flex-1">
              <div className="flex items-center gap-4 p-4 h-full bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
                <div className="p-2 bg-gray-200 rounded-lg group-hover:scale-110 transition-transform">
                  <List size={20} className="text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    View All Medicines
                  </p>
                  <p className="text-sm text-gray-500">
                    Browse complete inventory
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-gray-400 group-hover:text-gray-700 transition-colors"
                />
              </div>
            </Link>

            <Link to="/dashboard/order-list" className="flex-1">
              <div className="flex items-center gap-4 p-4 h-full bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform">
                  <ShoppingCart size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Go to Orders</p>
                  <p className="text-sm text-gray-500">
                    Manage customer orders
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-gray-400 group-hover:text-blue-600 transition-colors"
                />
              </div>
            </Link>

            <Link to="/dashboard/alert-list" className="flex-1">
              <div className="flex items-center gap-4 p-4 h-full bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform">
                  <AlertTriangle size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Go to Complaints
                  </p>
                  <p className="text-sm text-gray-500">
                    Check medication complaints
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-gray-400 group-hover:text-orange-600 transition-colors"
                />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="text-primary" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Category Distribution
            </h2>
          </div>
          <CategoryChart
            categoryDistribution={data.categoryDistribution || {}}
            categoryNames={categoryNames}
            totalMedicines={data.totalMedicines || 0}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Medicines */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Medicines
              </h2>
            </div>
            <Link to="/dashboard/medicine-list">
              <button className="px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition">
                View All
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            {data.recentMedicines && data.recentMedicines.length > 0 ? (
              data.recentMedicines.map((medicine, index) => (
                <motion.div
                  key={medicine._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <img
                    src={medicine.productImage}
                    alt={medicine.productName}
                    className="w-12 h-12 object-cover rounded-lg shadow-md border border-gray-200 group-hover:scale-110 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {medicine.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rs. {medicine.price} • Stock: {medicine.availableStock}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-400 group-hover:text-primary transition-colors"
                  />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No recent medicines
              </p>
            )}
          </div>
        </motion.div>

        {/* Low Stock Warnings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="text-orange-600" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Low Stock Alerts
            </h2>
          </div>
          <div className="space-y-4">
            {data.lowStockMedicines && data.lowStockMedicines.length > 0 ? (
              data.lowStockMedicines.map((medicine, index) => (
                <motion.div
                  key={medicine._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors group"
                >
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Package size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {medicine.productName}
                    </p>
                    <p className="text-sm text-orange-700 font-medium">
                      Only {medicine.availableStock} units remaining
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                    Urgent
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package size={32} className="text-green-600" />
                </div>
                <p className="text-gray-700 font-semibold mb-1">
                  All Stock Levels Good!
                </p>
                <p className="text-sm text-gray-500">
                  No low stock items to report
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewTab;
