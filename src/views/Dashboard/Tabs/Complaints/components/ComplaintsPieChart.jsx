import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ComplaintsPieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const chart = echarts.init(chartRef.current);

    const chartData = data.map(item => ({
      name: item.status,
      value: item.count
    }));

    const option = {
      title: {
        text: "Pending vs Resolved",
        left: "center",
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      series: [
        {
          type: "pie",
          radius: "70%",
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ],
      color: ["#f59e0b", "#10b981", "#ef4444", "#6b7280"]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center justify-center h-[400px]">
        <p className="text-gray-500">No complaint data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default ComplaintsPieChart;

