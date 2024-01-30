import type { Dispatch, ReactNode, SetStateAction } from "react";
import React, { memo } from "react";
import type { Product, Version } from "~/types/types";
import ProductView from "./ProductView";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import VersionView from "./VersionView";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useEscapeClick from "../customHooks/useEscapeClick";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isPrimary?: boolean;
}

const Drawer: React.FC<DrawerProps> = memo(({ isOpen, onClose, children, isPrimary }) => {
  const widthClass = isPrimary ? "md:w-10/12" : "md:w-9/12";

  useEscapeClick(onClose, isOpen);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-white bg-opacity-50 z-40" onClick={onClose}></div>}
      <div
        className={`fixed top-0 right-0 h-full bg-white border-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 w-full ${widthClass}`}
      >
        <button onClick={onClose} className="mt-4 ml-4 mb-1">
          <XMarkIcon className="h-5 w-5" /> {/* Icon as the close button */}
        </button>
        {children}
      </div>
    </>
  );
});

interface DrawerManagerProps {
  isProductDrawerOpen: boolean;
  isVersionDrawerOpen: boolean;
  onCloseProductDrawer: () => void;
  onCloseVersion: () => void;
  drawerProduct: Product | null;
  drawerVersion: Version | null;
  setDrawerVersionId: Dispatch<SetStateAction<number | null>>;
  drawerDefaultVersion: Version | undefined | null;
  openVersionDrawer: () => void;
  fetcherSubmit: fetcherSubmitType;
}

export const DrawerManager: React.FC<DrawerManagerProps> = memo(
  ({
    isProductDrawerOpen,
    isVersionDrawerOpen,
    onCloseProductDrawer,
    onCloseVersion,
    drawerProduct,
    drawerVersion,
    setDrawerVersionId,
    drawerDefaultVersion,
    openVersionDrawer,
    fetcherSubmit,
  }) => {
    // Overlay should be shown if the Version drawer is open
    const showOverlay = isVersionDrawerOpen;

    const className = showOverlay ? "fixed inset-0 bg-white bg-opacity-50 z-40" : "";

    return (
      <>
        <div className={`${className}`} onClick={onCloseVersion}>
          <Drawer
            isOpen={isProductDrawerOpen}
            onClose={onCloseProductDrawer}
            children={
              <ProductView
                product={drawerProduct}
                setDrawerVersionId={setDrawerVersionId}
                openVersionDrawer={openVersionDrawer}
                fetcherSubmit={fetcherSubmit}
              />
            }
            isPrimary
          />
        </div>
        <Drawer
          isOpen={isVersionDrawerOpen}
          onClose={onCloseVersion}
          children={<VersionView version={drawerVersion} defaultVersion={drawerDefaultVersion} />}
        />
      </>
    );
  }
);
