import { json } from "@remix-run/node";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, NavLink, useFetcher, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { ValidateProtectedPageRequest, handleResponseError } from "~/utils";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
  HomeIcon,
  TagIcon,
  ClockIcon,
  CogIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "./components/Svgs";
import { DrawerManager } from "./components/Drawer";
import { ToastContainer } from "react-toastify";
import DefaultActionFunction from "./actions/DefaultActionFunction";
import type { Product } from "~/types/types";
import SampleData from "~/SampleData";
import useWatchForUpdatedProducts from "./customHooks/useWatchForUpdatedProducts";

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

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await ValidateProtectedPageRequest(request);
    return json({ products: SampleData });
  } catch (error) {
    return handleResponseError(error);
  }
};

export const meta: MetaFunction = () => {
  return [{ title: "BullsAI Dash" }, { name: "description", content: "BullsAI Dashboard" }];
};

export const action = DefaultActionFunction;

export default function DashboardLayout() {
  const [products, setProducts] = useState(useLoaderData<typeof loader>().products);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const fetcher = useFetcher<typeof action>();
  const [isMainDrawerOpen, setIsMainDrawerOpen] = useState(false);
  const [isSecondaryDrawerOpen, setIsSecondaryDrawerOpen] = useState(false);
  const [secondaryDrawerChildren, setSecondaryDrawerChildren] = useState<React.ReactNode>(null);
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(null);
  const [pollingForVersionIds, setPollingForVersionIds] = useState(new Set<number>());

  // Close sidebar when the window size is larger than md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useWatchForUpdatedProducts(
    fetcher,
    drawerProduct,
    setDrawerProduct,
    pollingForVersionIds,
    setPollingForVersionIds,
    products,
    setProducts
  );

  const openMainDrawer = () => {
    setIsMainDrawerOpen(true);
  };

  const toggleSecondaryDrawer = (secondaryDrawerChildren: React.ReactNode) => {
    setIsSecondaryDrawerOpen(!isSecondaryDrawerOpen);
    setSecondaryDrawerChildren(secondaryDrawerChildren);
  };

  const closeMainDrawer = () => {
    setIsMainDrawerOpen(false);
  };

  const closeSecondaryDrawer = () => {
    setIsSecondaryDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-5 md:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <button onClick={toggleSidebar} className="p-4 md:hidden" aria-label="Open sidebar">
          <Bars3CenterLeftIcon className="h-5 w-5 text-primary" />
        </button>
        <Outlet
          context={{
            openMainDrawer,
            toggleSecondaryDrawer,
            fetcher,
            setDrawerProduct,
            products,
          }}
        />
      </div>

      <DrawerManager
        isMainOpen={isMainDrawerOpen}
        isSecondaryOpen={isSecondaryDrawerOpen}
        onCloseMain={closeMainDrawer}
        onCloseSecondary={closeSecondaryDrawer}
        drawerProduct={drawerProduct}
        secondaryChildren={secondaryDrawerChildren}
        toggleSecondaryDrawer={toggleSecondaryDrawer}
        fetcher={fetcher}
      />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={
          {
            // display: "flex", // Use inline-block for shrink-to-fit behavior
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
        // transition={"Bounce"}
      />
    </div>
  );
}
