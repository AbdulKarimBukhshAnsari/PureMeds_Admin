import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  PlusCircle,
  List,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Package2,
  AlertCircle,
  BarChart3,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { fetchMedicineList } from "../../apis/MedicineList/medicineList";
import { mockAlerts } from "../../utils/mockData";
import Button from "../../components/ui/Buttons/Button";
import Loader from "../../components/ui/LoadingAnimation/Loader";

function Dashboard() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStockCount: 0,
    totalAlerts: 0,
    totalValue: 0,
    categoryDistribution: {},
    recentMedicines: [],
    lowStockMedicines: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        
        // Fetch medicines (first page - typically 10 items per page)
        // Note: For accurate statistics, consider creating a dedicated dashboard API endpoint
        const medicineData = await fetchMedicineList(token, 1, "", "");
        const medicines = medicineData?.data?.products || [];
        
        // Calculate statistics
        // Using totalProducts from API for accurate total count
        const totalMedicines = medicineData?.data?.totalProducts || 0;
        
        // Filter low stock items from the current page
        const lowStockMedicines = medicines.filter((m) => m.availableStock < 50);
        const lowStockCount = lowStockMedicines.length;
        
        // Calculate inventory value from current page items
        // Note: This is approximate - for exact value, need all products
        const totalValue = medicines.reduce(
          (sum, m) => sum + (m.price * m.availableStock),
          0
        );
        
        // Category distribution from current page
        const categoryDistribution = medicines.reduce((acc, m) => {
          acc[m.category] = (acc[m.category] || 0) + 1;
          return acc;
        }, {});
        
        // Get recent medicines (first 5 from current page)
        const recentMedicines = medicines.slice(0, 5);
        
        // Get alerts count
        const totalAlerts = mockAlerts.length;
        
        setStats({
          totalMedicines,
          lowStockCount,
          totalAlerts,
          totalValue: Math.round(totalValue),
          categoryDistribution,
          recentMedicines,
          lowStockMedicines: lowStockMedicines.slice(0, 5),
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Set default values on error to prevent blank screen
        setStats({
          totalMedicines: 0,
          lowStockCount: 0,
          totalAlerts: 0,
          totalValue: 0,
          categoryDistribution: {},
          recentMedicines: [],
          lowStockMedicines: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [getToken]);

  const statCards = [
    {
      title: "Total Medicines",
      value: stats.totalMedicines,
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Low Stock Items",
      value: stats.lowStockCount,
      icon: AlertCircle,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      change: stats.lowStockCount > 0 ? "Action Needed" : "All Good",
      trend: stats.lowStockCount > 0 ? "down" : "up",
    },
    {
      title: "Active Alerts",
      value: stats.totalAlerts,
      icon: AlertTriangle,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      change: "+5",
      trend: "up",
    },
    {
      title: "Inventory Value",
      value: `Rs. ${stats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      change: "+8.2%",
      trend: "up",
    },
  ];

  const categoryNames = {
    "pain-fever": "Pain & Fever",
    "infections": "Infections",
    "heart-bp": "Heart & BP",
    "lungs-allergy": "Lungs & Allergy",
    "stomach-digestion": "Stomach & Digestion",
    "hormones-diabetes": "Hormones & Diabetes",
    "brain-mental": "Brain & Mental",
    "vitamins-others": "Vitamins & Others",
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background p-5 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent inline-block mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's what's happening with your inventory today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${card.bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
                    <Icon size={24} className={card.iconColor} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    card.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {card.trend === "up" ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    <span>{card.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="space-y-4">
              <Link to="/dashboard/add-medicine">
                <div className="flex items-center gap-4 p-4 mb-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl hover:from-primary/10 hover:to-primary/15 transition-all cursor-pointer group">
                  <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform">
                    <PlusCircle size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Add New Medicine</p>
                    <p className="text-sm text-gray-500">Add a new product to inventory</p>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link to="/dashboard/medicine-list">
                <div className="flex items-center gap-4 p-4 mb-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
                  <div className="p-2 bg-gray-200 rounded-lg group-hover:scale-110 transition-transform">
                    <List size={20} className="text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">View All Medicines</p>
                    <p className="text-sm text-gray-500">Browse complete inventory</p>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                </div>
              </Link>
              <Link to="/dashboard/alert-list">
                <div className="flex items-center gap-4 p-4 mb-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group">
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform">
                    <AlertTriangle size={20} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">View Alerts</p>
                    <p className="text-sm text-gray-500">Check medication alerts</p>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-400 group-hover:text-orange-600 transition-colors" />
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
              <h2 className="text-xl font-semibold text-gray-900">Category Distribution</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(stats.categoryDistribution).map(([category, count], index) => {
                const percentage = stats.totalMedicines > 0 
                  ? Math.round((count / stats.totalMedicines) * 100) 
                  : 0;
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {categoryNames[category] || category}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"
                      />
                    </div>
                  </motion.div>
                );
              })}
              {Object.keys(stats.categoryDistribution).length === 0 && (
                <p className="text-gray-500 text-center py-8">No category data available</p>
              )}
            </div>
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
                <h2 className="text-xl font-semibold text-gray-900">Recent Medicines</h2>
              </div>
              <Link to="/dashboard/medicine-list">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentMedicines.length > 0 ? (
                stats.recentMedicines.map((medicine, index) => (
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
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No recent medicines</p>
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
              <h2 className="text-xl font-semibold text-gray-900">Low Stock Alerts</h2>
            </div>
            <div className="space-y-4">
              {stats.lowStockMedicines.length > 0 ? (
                stats.lowStockMedicines.map((medicine, index) => (
                  <motion.div
                    key={medicine._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors group"
                  >
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <Package2 size={20} className="text-white" />
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
                    <Package2 size={32} className="text-green-600" />
                  </div>
                  <p className="text-gray-700 font-semibold mb-1">All Stock Levels Good!</p>
                  <p className="text-sm text-gray-500">No low stock items to report</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
