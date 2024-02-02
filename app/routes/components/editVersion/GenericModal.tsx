import type { ReactNode } from "react";
import React from "react";
import Modal from "react-modal";

// Define the types for the action buttons
export interface ModalActionButton {
  label: string;
  onClick: any;
  type: "primary" | "default";
}

// Define the props for the GenericModal component
interface GenericModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  content: ReactNode;
  actions: ModalActionButton[];
}

// Modal styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "white",
    borderRadius: "20px",
    padding: "p-5",
    boxShadow: "shadow-lg",
    minWidth: "300px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 10000,
  },
};

Modal.setAppElement("#root");

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onRequestClose, title, content, actions }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Modal" id="GenericModal">
      <div className="flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onRequestClose} className="text-gray-400 hover:text-gray-600">
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">{content}</div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center p-4 border-t border-gray-200">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`px-4 py-2 mx-2 text-sm font-semibold rounded-md ${
                action.type === "primary"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default GenericModal;
