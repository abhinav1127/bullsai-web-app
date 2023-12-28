// app/routes/dashboard/layout.tsx

import { json, type LoaderFunction } from "@remix-run/node";
import { Outlet, NavLink } from "@remix-run/react";
import { useState } from "react";
import { ValidateProtectedPageRequest, handleResponseError } from "~/utils";
import { Bars3CenterLeftIcon, HomeIcon, TagIcon, ClockIcon, CogIcon } from "@heroicons/react/24/outline";
import logo from "../../public/bullsai.png";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await ValidateProtectedPageRequest(request);
  } catch (error) {
    return handleResponseError(error);
  }
  return json({});
};

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gradient-to-b from-primary to-primaryLight p-5 space-y-4 transition duration-300 ease-in-out z-10 md:relative md:translate-x-0`}
      >
        <div className="relative flex justify-center items-center">
          <img src={logo} alt="BullsaAI Logo" className="h-16 w-16" />
          <Bars3CenterLeftIcon
            className="h-5 w-5 cursor-pointer text-white md:hidden absolute right-0"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="mt-10">
          {[
            { to: "/dashboard/home", icon: <HomeIcon className="h-4 w-4" />, label: "Home" },
            { to: "/dashboard/products", icon: <TagIcon className="h-4 w-4" />, label: "Products" },
            { to: "/dashboard/pending-versions", icon: <ClockIcon className="h-4 w-4" />, label: "Pending Versions" },
            { to: "/dashboard/settings", icon: <CogIcon className="h-4 w-4" />, label: "Settings" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-2 px-3 bg-primaryLight rounded-md text-white"
                    : "flex items-center py-2 px-3 text-white hover:bg-primaryLight hover:rounded-md"
                }
              >
                {icon} <span className="ml-2">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-70 z-5 md:hidden" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="flex-1">
        <button onClick={toggleSidebar} className="p-4 md:hidden">
          <Bars3CenterLeftIcon className="h-5 w-5 text-primary" />
        </button>
        <Outlet />
      </div>
    </div>
  );
}
