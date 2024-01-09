import type { ReactNode } from "react";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isPrimary?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, isPrimary }) => {
  const widthClass = isPrimary ? "md:w-4/5" : "md:w-3/5";

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-white bg-opacity-50 z-40" onClick={onClose}></div>}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${
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

  return (
    <>
      {showOverlay ? (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-40" onClick={onCloseSecondary}>
          <Drawer isOpen={isMainOpen} onClose={onCloseMain} children={mainChildren} isPrimary />
        </div>
      ) : (
        <Drawer isOpen={isMainOpen} onClose={onCloseMain} children={mainChildren} isPrimary />
      )}
      <Drawer isOpen={isSecondaryOpen} onClose={onCloseSecondary} children={secondaryChildren} />
    </>
  );
};
