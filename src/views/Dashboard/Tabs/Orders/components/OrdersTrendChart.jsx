import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const OrdersTrendChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const dates = data.map(item => item.date);
    const counts = data.map(item => item.count);

    const option = {
      title: {
        text: "Orders Trend (Last 7 Days)",
        left: "center",
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: dates,
        axisLabel: {
          rotate: 45,
        }
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: counts,
          type: "line",
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
              { offset: 1, color: "rgba(59, 130, 246, 0.1)" }
            ])
          },
          lineStyle: {
            color: "#3b82f6",
            width: 3
          },
          itemStyle: {
            color: "#3b82f6"
          }
        }
      ]
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

export default OrdersTrendChart;

