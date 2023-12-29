import React from "react";
import { Doughnut } from "react-chartjs-2";

interface RingGraphProps {
  percentage: number;
  totalVisitors: number;
  currentVisitors: number;
}

const RingGraph: React.FC<RingGraphProps> = ({ percentage, totalVisitors, currentVisitors }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#4ade80", "#e2e8f0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
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
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();

        // Convert fontSize to a number
        var fontSize = parseFloat((height / 100).toFixed(2)); // Larger font size
        ctx.font = `bold ${fontSize}em sans-serif`;
        ctx.fillStyle = "#000"; // Black color for percentage
        ctx.textBaseline = "middle";
        var text = `${percentage}%`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 - fontSize * 10; // Adjust vertical position
        ctx.fillText(text, textX, textY);

        // Style for the additional text
        var subTextFontSize = (height / 160).toFixed(2); // Smaller font size for additional text
        ctx.font = `${subTextFontSize}em sans-serif`;
        ctx.fillStyle = "#718096"; // Gray color for additional text
        var subText = `${currentVisitors} of ${totalVisitors} visitors`,
          subTextX = Math.round((width - ctx.measureText(subText).width) / 2),
          subTextY = textY + fontSize * 20; // Position below the main text
        ctx.fillText(subText, subTextX, subTextY);

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
