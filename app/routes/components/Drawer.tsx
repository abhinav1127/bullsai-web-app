import type { ReactNode } from "react";
import React, { memo } from "react";
import type { Product } from "~/types/types";
import ProductView from "./ProductView";
import type { FetcherWithComponents } from "@remix-run/react";
import type { fetcherSubmitType } from "~/types/outletContextTypes";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isPrimary?: boolean;
}

const Drawer: React.FC<DrawerProps> = memo(({ isOpen, onClose, children, isPrimary }) => {
  const widthClass = isPrimary ? "md:w-10/12" : "md:w-9/12";

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-white bg-opacity-50 z-40" onClick={onClose}></div>}
      <div
        className={`fixed top-0 right-0 h-full bg-white border-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 w-full ${widthClass}`}
      >
        <button onClick={onClose} className="mt-4 ml-4 mb-1">
          Close
        </button>
        {children}
      </div>
    </>
  );
});

interface DrawerManagerProps {
  isMainOpen: boolean;
  isSecondaryOpen: boolean;
  onCloseMain: () => void;
  onCloseSecondary: () => void;
  secondaryChildren: ReactNode;
  drawerProduct: Product | null;
  toggleSecondaryDrawer: (component: React.ReactNode) => void;
  fetcherSubmit: fetcherSubmitType;
}

export const DrawerManager: React.FC<DrawerManagerProps> = memo(
  ({
    isMainOpen,
    isSecondaryOpen,
    onCloseMain,
    onCloseSecondary,
    secondaryChildren,
    drawerProduct,
    toggleSecondaryDrawer,
    fetcherSubmit,
  }) => {
    // Overlay should be shown if the secondary drawer is open
    const showOverlay = isSecondaryOpen;

    const className = showOverlay ? "fixed inset-0 bg-white bg-opacity-50 z-40" : "";

    console.log("I, DrawerManager, am rendering");

    return (
      <>
        <div className={`${className}`} onClick={onCloseSecondary}>
          <Drawer
            isOpen={isMainOpen}
            onClose={onCloseMain}
            children={
              <ProductView
                product={drawerProduct}
                toggleSecondaryDrawer={toggleSecondaryDrawer}
                fetcherSubmit={fetcherSubmit}
              />
            }
            isPrimary
          />
        </div>
        <Drawer isOpen={isSecondaryOpen} onClose={onCloseSecondary} children={secondaryChildren} />
      </>
    );
  }
);
