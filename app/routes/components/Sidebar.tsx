import React from "react";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
  HomeIcon,
  TagIcon,
  ClockIcon,
  CogIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "@remix-run/react";
import { Logo } from "../constants/Svgs";

interface SidebarItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { to: "/dashboard/home", icon: <HomeIcon className="h-4 w-4" />, label: "Home" },
  { to: "/dashboard/products", icon: <TagIcon className="h-4 w-4" />, label: "Products" },
  { to: "/dashboard/pending-versions", icon: <ClockIcon className="h-4 w-4" />, label: "Pending Versions" },
  { to: "/dashboard/metrics", icon: <ChartBarIcon className="h-4 w-4" />, label: "Store Metrics" },
  { to: "/dashboard/settings", icon: <CogIcon className="h-4 w-4" />, label: "Settings" },
];

const Sidebar: React.FC<{ toggleSidebar: () => void; isSidebarOpen: boolean }> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <React.Fragment>
      <div
        className={`absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gradient-to-b from-primary to-primaryLight p-5 space-y-4 transition duration-300 ease-in-out z-10 md:relative md:translate-x-0`}
      >
        <div className="relative flex justify-between items-center">
          <Logo className="h-16 w-16 fill-white" />
          <button
            onClick={toggleSidebar}
            className="h-5 w-5 cursor-pointer text-white md:hidden"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <XMarkIcon /> : <Bars3CenterLeftIcon />}
          </button>
        </div>
        <ul className="mt-10">
          {sidebarItems.map(({ to, icon, label }) => (
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

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-5 md:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        ></div>
      )}
    </React.Fragment>
  );
};

export default Sidebar;
