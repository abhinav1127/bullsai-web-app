import { useState } from "react";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import type { Version } from "~/types/types";

function useEditVersion(version: Version | null, fetcherSubmit: fetcherSubmitType) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(version?.productTitle || "");
  const [editedDescription, setEditedDescription] = useState(version?.description || "");
  const [editedImage, setEditedImage] = useState(version?.heroImage || "");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here you would typically make a request to your backend to save the changes
    // For now, we'll just log the new values and switch back to non-editing mode
    console.log(editedTitle, editedDescription, editedImage);
    setIsEditing(false);
  };

  const onCancelSave = () => {
    setIsEditing(false);
    setEditedTitle(version?.productTitle || "");
    setEditedDescription(version?.description || "");
    setEditedImage(version?.heroImage || "");
  };

  return {
    isEditing,
    editedTitle,
    editedDescription,
    editedImage,
    handleEditClick,
    handleSaveClick,
    onCancelSave,
  };
}

export default useEditVersion;
