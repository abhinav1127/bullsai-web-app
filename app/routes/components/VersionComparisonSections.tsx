import type { FC } from "react";
import type { Image, Version } from "../../types/types";
import React, { useCallback, useState } from "react";
import { EditorWithMenu, SimpleEditor } from "./editVersion/TipTap";
import { ActionButton } from "./Buttons";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import { ImageModal } from "./editVersion/ImageModal";
import type { EditVersionType } from "../customHooks/useEditVersion";
import DOMPurify from "dompurify";

interface VersionComparisonSectionProps {
  version: Version;
  badgeLabel: string;
  backgroundColor: string;
  fetcherSubmit: fetcherSubmitType;
  isEditing?: boolean;
  editVersionType?: EditVersionType;
}

export const VersionComparisonSection: FC<VersionComparisonSectionProps> = ({
  version,
  badgeLabel,
  backgroundColor,
  isEditing,
  fetcherSubmit,
  editVersionType,
}) => {
  return (
    <div className="flex flex-col flex-1">
      <span
        className={`flex-initial ml-2 px-3 py-1 ${backgroundColor} text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start -mb-3 z-10`}
      >
        {badgeLabel}
      </span>
      <div className="overflow-scroll h-full border rounded-lg p-4 flex-initial">
        {editVersionType?.isEditing ? (
          <EditingVersionDetailsSection
            version={version}
            fetcherSubmit={fetcherSubmit}
            editVersionType={editVersionType}
          />
        ) : (
          <NormalVersionDetailsSection version={version} />
        )}
      </div>
    </div>
  );
};

const NormalVersionDetailsSection: FC<{ version: Version }> = ({ version }) => {
  const safeDescription = DOMPurify.sanitize(version.description);
  return (
    <React.Fragment>
      <p className="text-lg font-medium mt-2 pb-1 text-center border-b">{version.productTitle}</p>
      <div className="flex flex-col justify-center my-6 items-center gap-2">
        <img
          src={version.heroImage}
          alt={version.productTitle}
          className="min-h-40 h-48 max-w-full rounded-xl object-contain items-center"
        />
      </div>
      <div
        className="leading-normal break-words text-gray-600 text-sm"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></div>
    </React.Fragment>
  );
};

const EditingVersionDetailsSection: FC<{
  version: Version;
  fetcherSubmit: fetcherSubmitType;
  editVersionType: EditVersionType;
}> = ({ version, fetcherSubmit, editVersionType }) => {
  const [imageModalIsOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(version.heroImage);

  const setImage = useCallback(
    (image: Image) => {
      setImageUrl(image.url);
      editVersionType.setEditedImage(image.url);
    },
    [setImageUrl, editVersionType]
  );

  const onChangeImageClicked = useCallback(async () => {
    fetcherSubmit({ actionType: "getProductImages", productId: version.productId }, { method: "POST" });
    setIsOpen(true);
  }, [version, fetcherSubmit]);

  return (
    <React.Fragment>
      <SimpleEditor content={version.productTitle} setEditedContent={editVersionType.setEditedTitle} />
      <div className="flex flex-col justify-center my-6 items-center gap-2">
        <img
          src={imageUrl}
          alt={version.productTitle}
          className="min-h-40 h-48 max-w-full rounded-xl object-contain items-center"
        />
        <ActionButton text="Change Image" onClick={() => onChangeImageClicked()} />
      </div>
      <EditorWithMenu content={version.description} setEditedContent={editVersionType.setEditedDescription} />

      <ImageModal
        isOpen={imageModalIsOpen}
        closeModal={() => setIsOpen(false)}
        setVersionImage={(image: Image) => setImage(image)}
        heroImageUrl={imageUrl}
      />
    </React.Fragment>
  );
};
