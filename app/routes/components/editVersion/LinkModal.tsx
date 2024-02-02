import React, { useEffect, useRef } from "react";
import type { ModalActionButton } from "./GenericModal";
import GenericModal from "./GenericModal"; // Ensure this import points to where your GenericModal is defined

interface ILinkModalProps extends ReactModal.Props {
  url: string;
  closeModal: () => void;
  onChangeUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveLink: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveLink: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LinkModal: React.FC<ILinkModalProps> = ({
  url = "",
  isOpen,
  closeModal,
  onChangeUrl,
  onSaveLink,
  onRemoveLink,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("rendering LinkModal");

  // Focus the input when the modal is opened, was not working without setTimeout
  useEffect(() => {
    setTimeout(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  }, [isOpen]);

  // Content of the modal
  const modalContent = (
    <div>
      <input className="modal-input p-2" ref={inputRef} autoFocus value={url} onChange={onChangeUrl} />
    </div>
  );

  // Actions for the modal
  const modalActions: ModalActionButton[] = [
    {
      label: "Remove",
      onClick: onRemoveLink,
      type: "default" as const, // 'as const' is used for type narrowing
    },
    {
      label: "Save",
      onClick: onSaveLink,
      type: "primary" as const,
    },
  ];

  return (
    <GenericModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      title="Edit Link"
      content={modalContent}
      actions={modalActions}
    />
  );
};
