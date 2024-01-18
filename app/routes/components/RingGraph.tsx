import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface RingGraphProps {
  value: number;
  maxValue: number;
}

const RingGraph: React.FC<RingGraphProps> = ({ value, maxValue }) => {
  const percentage = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#7F1011", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "90%",
    maintainAspectRatio: false,
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  const plugins = [
    {
      id: "centered_text",
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        const { width, height } = chart;
        ctx.restore();
        const fontSize = (height / 90).toFixed(2); // Adjust for better sizing
        ctx.font = `bold ${fontSize}em sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        const text = `${percentage}%`;
        const textX = width / 2;
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
};

export default RingGraph;
