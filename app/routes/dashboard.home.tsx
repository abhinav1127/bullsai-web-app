import { Link, useNavigate } from "@remix-run/react";
import { CheckCircleIcon, ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement } from "chart.js";
import RingChart from "./components/PersonalizedPercentageRingGraph";
import ConversionLiftBarGraph from "./components/ConversionLiftBarGraph";
import React from "react";

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);

const sections = [
  {
    title: "Total Additional Revenue",
    icon: CheckCircleIcon,
    content: <p className="text-2xl font-bold">$546</p>,
  },
  {
    title: "% Personalized Visitors",
    icon: UserGroupIcon,
    content: (
      <div className="relative">
        <RingChart totalVisitors={9000} personalizedVisitors={3000} />
      </div>
    ),
  },
  {
    title: "Conversion Lift",
    icon: ChartBarIcon,
    content: (
      <React.Fragment>
        <p className="text-2xl font-bold mb-1">{parseFloat((((2.5 - 2.1) / 2.1) * 100).toFixed(2))}%</p>
        <ConversionLiftBarGraph nonPersonalizedConversionRate={2.1} personalizedConversionRate={2.5} />
      </React.Fragment>
    ),
  },
];

export default function DashboardHome() {
  const navigate = useNavigate();

  const handleSectionClick = () => {
    navigate("/dashboard/metrics");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Home</h1>

      <div className="bg-white rounded-lg shadow-md p-4">
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
              <div className="flex flex-col mb-4 items-center">
                <section.icon className="w-6 h-6 mb-1 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-medium text-center">{section.title}</h3>
              </div>
              <div className="flex flex-col justify-center items-center relative">{section.content}</div>
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
