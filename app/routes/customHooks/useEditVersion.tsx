import { useCallback, useEffect, useState } from "react";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import type { Version } from "~/types/types";
import { stripHtml } from "../constants/utils";

export type EditVersionType = {
  isEditing: boolean;
  setisEditing: (isEditing: boolean) => void;
  editedTitle: string;
  editedDescription: string;
  editedImage: string;
  setEditedTitle: (title: string) => void;
  setEditedDescription: (description: string) => void;
  setEditedImage: (image: string) => void;
};

function useEditVersion(version: Version | null, fetcherSubmit: fetcherSubmitType) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(version?.productTitle || "");
  const [editedDescription, setEditedDescription] = useState(version?.description || "");
  const [editedImage, setEditedImage] = useState(version?.heroImage || "");

  useEffect(() => {
    setEditedTitle(version?.productTitle || "");
    setEditedDescription(version?.description || "");
    setEditedImage(version?.heroImage || "");
  }, [version]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = useCallback(() => {
    if (!version) return;
    fetcherSubmit(
      {
        actionType: "updateVersion",
        originalVersion: JSON.stringify(version),
        updatedTitle: stripHtml(editedTitle),
        updatedDescription: editedDescription,
        updatedImageUrl: editedImage,
      },
      { method: "POST" }
    );

    setIsEditing(false);
    setEditedTitle(stripHtml(editedTitle));
    setEditedDescription(version?.description);
    setEditedImage(editedImage);
  }, [version, fetcherSubmit, editedTitle, editedDescription, editedImage]);

  const onCancelSave = () => {
    setIsEditing(false);
    setEditedTitle(version?.productTitle || "");
    setEditedDescription(version?.description || "");
    setEditedImage(version?.heroImage || "");
  };

  return {
    editVersionType: {
      isEditing,
      setisEditing: setIsEditing,
      editedTitle,
      editedDescription,
      editedImage,
      setEditedTitle,
      setEditedDescription,
      setEditedImage,
    },
    handleEditClick,
    handleSaveClick,
    onCancelSave,
  };
}

export default useEditVersion;
