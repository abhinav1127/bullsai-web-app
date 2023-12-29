import { Link, useNavigate } from "@remix-run/react";
import { CheckCircleIcon, ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);

const personalizedVisitorsData = {
  datasets: [
    {
      data: [38, 62], // 38% personalized, 62% remaining
      backgroundColor: ["#7F1011", "#E0E0E0"],
      borderWidth: 0,
      cutout: "80%",
    },
  ],
};

const conversionLiftData = {
  labels: ["Non-Personalized", "Personalized"],
  datasets: [
    {
      data: [10, 25], // Example data
      backgroundColor: ["#E0E0E0", "#7F1011"],
    },
  ],
};

const options = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      color: "black",
      anchor: "end",
      align: "top",
      formatter: function (value, context) {
        return context.chart.data.labels[context.dataIndex];
      },
    },
  },
};

const sections = [
  {
    title: "Total Additional Checkouts",
    icon: CheckCircleIcon,
    content: <p className="text-2xl font-bold">546</p>,
  },
  {
    title: "% Personalized Visitors",
    icon: UserGroupIcon,
    content: (
      <div className="relative">
        <Doughnut data={personalizedVisitorsData} />
        <div className="absolute inset-0 flex justify-center items-center">
          <div>
            <p className="text-xl font-bold">38%</p>
            <p className="text-sm">3,000 of 9,000 visitors</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Conversion Lift",
    icon: ChartBarIcon,
    content: <Bar data={conversionLiftData} options={options} />,
  },
];

export default function DashboardHome() {
  const navigate = useNavigate();

  const handleSectionClick = () => {
    navigate("/dashboard/metrics");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to BullsAI</h1>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg mb-4">Summary (last 30 days)</h2>
        <div className="grid grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`p-4 cursor-pointer ${index < sections.length - 1 ? "border-r border-gray-200" : ""}`}
              onClick={handleSectionClick}
            >
              <section.icon className="w-6 h-6 mr-2 text-primary" aria-hidden="true" />
              <h3 className="text-lg font-medium">{section.title}</h3>
              {section.content}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Link to="/dashboard/active-products">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-2xl font-bold mb-2">38</p>
            <p className="text-gray-500">Active Products</p>
          </div>
        </Link>
        <Link to="/dashboard/pending-products">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-2xl font-bold mb-2">10</p>
            <p className="text-gray-500">Pending Versions for Review</p>
          </div>
        </Link>
        <Link to="/dashboard/suggested-products">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-2xl font-bold mb-2">4</p>
            <p className="text-gray-500">Suggested Products to Activate</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
