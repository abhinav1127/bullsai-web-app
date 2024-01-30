import { json } from "@remix-run/node";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import { useState, useCallback, useMemo } from "react";
import { ValidateProtectedPageRequest, handleResponseError } from "~/utils";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { DrawerManager } from "./components/Drawer";
import { ToastContainer } from "react-toastify";
import DefaultActionFunction from "./actions/DefaultActionFunction";
import type { Product } from "~/types/types";
import SampleData from "~/SampleData";
import useWatchForUpdatedProducts from "./customHooks/useWatchForUpdatedProducts";
import { findDrawerandDefaultVersions } from "./constants/productUtils";
import useSidebarState from "./customHooks/useSidebarState";
import Sidebar from "./components/Sidebar";

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
  const { isSidebarOpen, toggleSidebar } = useSidebarState();
  const fetcher = useFetcher<typeof action>();
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [isVersionDrawerOpen, setIsVersionDrawerOpen] = useState(false);
  const [drawerProductId, setDrawerProductId] = useState<number | null>(null);
  const [drawerVersionId, setDrawerVersionId] = useState<number | null>(null);
  const [pollingForVersionIds, setPollingForVersionIds] = useState(new Set<number>());
  const drawerProduct: Product | null = useMemo(() => {
    if (!drawerProductId) {
      return null;
    }
    return products.find((product: Product) => product.id === drawerProductId) ?? null;
  }, [drawerProductId, products]);
  const { drawerVersion, drawerDefaultVersion } = useMemo(() => {
    return findDrawerandDefaultVersions(products, drawerVersionId);
  }, [drawerVersionId, products]);

  useWatchForUpdatedProducts(fetcher, pollingForVersionIds, setPollingForVersionIds, setProducts);

  const openProductDrawer = useCallback(() => {
    setIsProductDrawerOpen(true);
  }, []);

  const openVersionDrawer = useCallback(() => {
    setIsVersionDrawerOpen(true);
  }, []);

  const closeProductDrawer = useCallback(() => {
    setIsProductDrawerOpen(false);
  }, []);

  const closeVersionDrawer = useCallback(() => {
    setIsVersionDrawerOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1">
        <button onClick={toggleSidebar} className="p-4 md:hidden" aria-label="Open sidebar">
          <Bars3CenterLeftIcon className="h-5 w-5 text-primary" />
        </button>
        <Outlet
          context={{
            openProductDrawer,
            openVersionDrawer: openVersionDrawer,
            fetcherSubmit: fetcher.submit,
            setDrawerProductId,
            products,
          }}
        />
      </div>

      <DrawerManager
        isProductDrawerOpen={isProductDrawerOpen}
        isVersionDrawerOpen={isVersionDrawerOpen}
        onCloseProductDrawer={closeProductDrawer}
        onCloseVersion={closeVersionDrawer}
        drawerProduct={drawerProduct}
        drawerVersion={drawerVersion}
        setDrawerVersionId={setDrawerVersionId}
        drawerDefaultVersion={drawerDefaultVersion}
        openVersionDrawer={openVersionDrawer}
        fetcherSubmit={fetcher.submit}
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
