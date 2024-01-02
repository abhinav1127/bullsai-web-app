import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface ConversionLiftBarGraphProps {
  nonPersonalizedConversionRate: number;
  personalizedConversionRate: number;
}

const ConversionLiftBarGraph: React.FC<ConversionLiftBarGraphProps> = ({
  nonPersonalizedConversionRate,
  personalizedConversionRate,
}) => {
  const conversionLiftData = {
    labels: ["Non-Personalized", "Personalized"],
    datasets: [
      {
        data: [nonPersonalizedConversionRate, personalizedConversionRate],
        backgroundColor: ["#E0E0E0", "#7F1011"],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        grid: {
          display: false, // Optional: Hide grid lines for x-axis
        },
      },
      y: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 20, // Adjust this value to ensure enough space for labels
      },
    },
    plugins: {
      id: "conversionLift",
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        anchor: "end",
        align: "top",
        formatter: function (value) {
          return value + "%"; // Return the actual value
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={conversionLiftData} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default ConversionLiftBarGraph;
