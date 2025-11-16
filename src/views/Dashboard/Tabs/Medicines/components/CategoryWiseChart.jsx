import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const CategoryWiseChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const chart = echarts.init(chartRef.current);

    const categories = data.map(item => item.category);
    const values = data.map(item => item.count);

    const option = {
      title: {
        text: "Category Wise Medicines",
        left: "center",
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        type: "category",
        data: categories,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: values,
          type: "bar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#3b82f6" },
              { offset: 1, color: "#8b5cf6" }
            ])
          }
        }
      ]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center justify-center h-[400px]">
        <p className="text-gray-500">No category data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default CategoryWiseChart;

