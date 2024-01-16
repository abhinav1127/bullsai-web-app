import type { ReactNode } from "react";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isPrimary?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, isPrimary }) => {
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
};

interface DrawerManagerProps {
  isMainOpen: boolean;
  isSecondaryOpen: boolean;
  onCloseMain: () => void;
  onCloseSecondary: () => void;
  mainChildren: ReactNode;
  secondaryChildren: ReactNode;
}

export const DrawerManager: React.FC<DrawerManagerProps> = ({
  isMainOpen,
  isSecondaryOpen,
  onCloseMain,
  onCloseSecondary,
  mainChildren,
  secondaryChildren,
}) => {
  // Overlay should be shown if the secondary drawer is open
  const showOverlay = isSecondaryOpen;

  const className = showOverlay ? "fixed inset-0 bg-white bg-opacity-50 z-40" : "";

  return (
    <>
      <div className={`${className}`} onClick={onCloseSecondary}>
        <Drawer isOpen={isMainOpen} onClose={onCloseMain} children={mainChildren} isPrimary />
      </div>
      <Drawer isOpen={isSecondaryOpen} onClose={onCloseSecondary} children={secondaryChildren} />
    </>
  );
};
