import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const CategoryChart = ({ categoryDistribution, categoryNames, totalMedicines }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !totalMedicines) return;

    const chart = echarts.init(chartRef.current);

    const categories = Object.keys(categoryDistribution);
    const data = categories.map(category => ({
      name: categoryNames[category] || category,
      value: categoryDistribution[category],
      percentage: Math.round((categoryDistribution[category] / totalMedicines) * 100)
    }));

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: "{b}\n{d}%"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold"
            }
          },
          data: data
        }
      ],
      color: [
        "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
        "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"
      ]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [categoryDistribution, categoryNames, totalMedicines]);

  if (Object.keys(categoryDistribution).length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No category data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {Object.entries(categoryDistribution).map(([category, count]) => {
          const percentage = totalMedicines > 0 
            ? Math.round((count / totalMedicines) * 100) 
            : 0;
          return (
            <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                {categoryNames[category] || category}
              </p>
              <p className="text-lg font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500">{percentage}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChart;

