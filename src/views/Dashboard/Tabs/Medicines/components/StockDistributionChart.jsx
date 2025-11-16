import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const StockDistributionChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const chartData = [
      { name: "Critical (<10)", value: data.Critical || 0 },
      { name: "Low (10-50)", value: data.Low || 0 },
      { name: "Medium (50-100)", value: data.Medium || 0 },
      { name: "High (>100)", value: data.High || 0 },
    ];

    const option = {
      title: {
        text: "Stock Level Distribution",
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
      color: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default StockDistributionChart;

