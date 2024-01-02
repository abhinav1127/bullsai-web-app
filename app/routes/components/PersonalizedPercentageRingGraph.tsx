import React from "react";
import { Doughnut } from "react-chartjs-2";

interface PersonalizedPercentageRingGraphProps {
  personalizedVisitors: number;
  totalVisitors: number;
}

const PersonalizedPercentageRingGraph: React.FC<PersonalizedPercentageRingGraphProps> = ({
  personalizedVisitors,
  totalVisitors,
}) => {
  const percentage = totalVisitors > 0 ? Math.round((personalizedVisitors / totalVisitors) * 100) : 0;

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
  };

  const plugins = [
    {
      id: "centered_text",
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();

        // Font size for percentage
        var fontSize = parseFloat((height / 100).toFixed(2));
        ctx.font = `bold ${fontSize}em sans-serif`;
        ctx.fillStyle = "#000";
        ctx.textBaseline = "middle";
        var text = `${percentage}%`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2; // Centered vertically
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

export default PersonalizedPercentageRingGraph;
