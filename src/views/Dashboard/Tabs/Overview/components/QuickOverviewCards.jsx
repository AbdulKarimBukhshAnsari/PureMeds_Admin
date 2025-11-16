import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, FileText, Calendar } from "lucide-react";

const QuickOverviewCards = ({ todayOrders, pendingComplaints, expiringSoon }) => {
  const cards = [
    {
      title: "Today Orders",
      value: todayOrders,
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending Complaints",
      value: pendingComplaints,
      icon: FileText,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Medicines Expiring Soon",
      value: expiringSoon,
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${card.bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
                <Icon size={24} className={card.iconColor} />
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
  );
};

export default QuickOverviewCards;

