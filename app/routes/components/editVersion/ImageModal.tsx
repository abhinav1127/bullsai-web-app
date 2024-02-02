import { useFetchers } from "@remix-run/react";
import React, { useEffect } from "react";
import type { Image } from "~/types/types";
import type { ModalActionButton } from "./GenericModal";
import GenericModal from "./GenericModal";
import { LoadingSpinner } from "../../constants/Svgs";

interface IImageModalProps extends ReactModal.Props {
  isOpen: boolean;
  heroImageUrl: string;
  closeModal: () => void;
  setVersionImage: (image: Image) => void;
}

export const ImageModal: React.FC<IImageModalProps> = ({ heroImageUrl, isOpen, closeModal, setVersionImage }) => {
  const [images, setImages] = React.useState<Image[]>([]);
  const fetchers = useFetchers();

  useEffect(() => {
    const imagesFetcher = fetchers.find((fetcher) => fetcher.data?.productImages);
    if (imagesFetcher) {
      setImages(imagesFetcher.data.productImages);
    }
  }, [fetchers]);

  const modalContent =
    images && images.length > 0 ? (
      <div className="flex flex-wrap justify-around">
        {images.map((image, index) => (
          <div key={index} className="relative w-48 h-48 m-5">
            <img
              key={index}
              src={image.url}
              alt={image.alt}
              onClick={() => setVersionImage(image)}
              className={`w-full h-full object-contain bg-gray-200 shadow-md transition-transform ease-in-out duration-200 cursor-pointer ${
                image.url === heroImageUrl
                  ? "border-2 border-green-700 transform scale-110"
                  : "border-2 border-transparent"
              }`}
            />
            {image.url === heroImageUrl && (
              <div className="absolute right-0 bottom-0 bg-green-700 text-white text-2xl rounded-full transition-all ease-in-out duration-200 transform scale-110 w-8 h-8 flex items-center justify-center">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner additionalClasses="h-8 w-8 m-20" />
      </div>
    );

  // Actions for the modal
  const modalActions: ModalActionButton[] = [
    {
      label: "Close",
      onClick: closeModal,
      type: "default" as const,
    },
  ];

  return (
    <GenericModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      title="Select Hero Image for Version"
      content={modalContent}
      actions={modalActions}
    />
  );
};
