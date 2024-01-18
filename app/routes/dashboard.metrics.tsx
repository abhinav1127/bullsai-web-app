import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TagIcon, ChartBarIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import RingGraph from "./components/RingGraph";
import { HomepageMetricSection } from "./components/MetricsSummaryCards";
import ConversionLiftBarGraph from "./components/ConversionLiftBarGraph";

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

// Define types for your metrics
type MetricType = "Cumulative Added Revenue" | "Conversion Rate Lift" | "Add to Cart Lift" | "% Personalized";

const DashboardMetrics: React.FC = () => {
  // State to keep track of the selected metric
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("Cumulative Added Revenue");
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          // position: "top",
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return selectedMetric === "Cumulative Added Revenue"
                ? " $" + context.parsed.y.toLocaleString()
                : " " + context.parsed.y + "%";
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              return selectedMetric === "Cumulative Added Revenue" ? "$" + value.toLocaleString() : value + "%";
            },
          },
        },
      },
    };
  }, [selectedMetric]);

  // Sample data for each metric
  const metricData: Record<MetricType, number[]> = {
    "Cumulative Added Revenue": [12000, 19000, 17000, 22000, 23000, 21000, 25000, 26000, 24000, 28000, 27000, 30000],
    "Conversion Rate Lift": [1.2, 1.9, 1.7, 2.2, 2.3, 2.1, 2.5, 2.6, 2.4, 2.8, 2.7, 3.0],
    "Add to Cart Lift": [0.8, 1.0, 0.9, 1.1, 1.3, 1.2, 1.5, 1.6, 1.4, 1.8, 1.7, 1.9],
    "% Personalized": [20, 30, 40, 50, 60, 70, 80, 90, 85, 75, 65, 55],
  };

  // Chart data based on the selected metric
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: selectedMetric,
        data: metricData[selectedMetric],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Function to handle metric change
  const handleMetricChange = (metric: MetricType) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="container mx-auto p-4 space-y-4 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Store Metrics</h1>

      <div className="bg-white rounded-lg border p-4 h-3/12">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 h-full">
          <div className="p-4 sm:border-r border-gray-200 border-b sm:border-b-0">
            <HomepageMetricSection
              title="Products Activated"
              sectionIcon={TagIcon}
              content={<RingGraph value={100} maxValue={200} />}
            />
          </div>
          <div className="p-4 sm:border-r border-gray-200 border-b sm:border-b-0">
            <HomepageMetricSection
              title="Lifetime Added Revenue"
              sectionIcon={CurrencyDollarIcon}
              content={<p className="text-2xl font-bold">$546</p>}
            />
          </div>
          <div className="p-4">
            <HomepageMetricSection
              title="Lifetime Conversion Lift"
              sectionIcon={ChartBarIcon}
              content={
                <>
                  <p className="text-2xl font-bold mb-1">{parseFloat((((2.5 - 2.1) / 2.1) * 100).toFixed(2))}%</p>
                  <ConversionLiftBarGraph nonPersonalizedConversionRate={2.1} personalizedConversionRate={2.5} />
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* Time Series Graph */}
      <div className="card bg-white p-4 border rounded-lg">
        {/* Metric Selection Interface */}
        <div className="flex mb-4 border-b">
          {Object.keys(metricData).map((metric) => (
            <button
              key={metric}
              onClick={() => handleMetricChange(metric as MetricType)}
              className={`px-4 py-2 h-11 text-sm font-semibold hover:bg-gray-100 ${
                selectedMetric === metric ? "border-b-2 border-primary text-primary" : "text-gray-600"
              }`}
            >
              {metric}
            </button>
          ))}
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardMetrics;
