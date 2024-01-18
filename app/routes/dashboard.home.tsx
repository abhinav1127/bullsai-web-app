import { Link, useNavigate } from "@remix-run/react";
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement } from "chart.js";
import { HomepageMetricSection } from "./components/MetricsSummaryCards";
import sections from "./components/dashboardSectionData"; // Import sections and utility functions

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);

export default function DashboardHome() {
  const navigate = useNavigate();

  const handleSectionClick = () => {
    navigate("/dashboard/metrics");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Home</h1>

      <div className="bg-white rounded-lg border p-4">
        <h2 className="text-lg mb-4">Summary (last 30 days)</h2>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`p-4 cursor-pointer ${
                index < sections.length - 1 ? "sm:border-r border-gray-200 border-b sm:border-b-0" : ""
              }`}
              onClick={handleSectionClick}
            >
              <HomepageMetricSection {...section} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Link to="/dashboard/active-products">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-2xl font-bold mb-2">38</p>
            <p className="text-gray-500">Active Products</p>
          </div>
        </Link>
        <Link to="/dashboard/pending-products">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-2xl font-bold mb-2">10</p>
            <p className="text-gray-500">Pending Versions for Review</p>
          </div>
        </Link>
        <Link to="/dashboard/suggested-products">
          <div className="bg-white rounded-lg border p-4">
            <p className="text-2xl font-bold mb-2">4</p>
            <p className="text-gray-500">Suggested Products to Activate</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
