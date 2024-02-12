import type { FC } from "react";
import { useEffect, useState } from "react";
import type { Store } from "~/SampleData";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import { ActionButton } from "./ActionButton";

interface SettingsActionButtonsProps {
  storeName: string;
  storeDescription: string;
  bannedWords: string[];
  selectImageInstructions: string;
  generateDescriptionInstructions: string;
  exampleDescription: string;
  store: Store;
  fetcherSubmit: fetcherSubmitType;
  discardChanges: () => void;
}

const SettingsActionButtons: FC<SettingsActionButtonsProps> = ({
  fetcherSubmit,
  storeName,
  storeDescription,
  bannedWords,
  selectImageInstructions,
  generateDescriptionInstructions,
  exampleDescription,
  store,
  discardChanges,
}) => {
  const [fieldChanged, setFieldChanged] = useState(false);
  console.log("fieldChanged", fieldChanged);

  useEffect(() => {
    const { bannedWords, selectImageInstructions, generateDescriptionInstructions, exampleDescription } =
      store.storeSettings;
    if (
      storeName !== store.name ||
      storeDescription !== store.description ||
      bannedWords !== store.storeSettings.bannedWords ||
      selectImageInstructions !== store.storeSettings.selectImageInstructions ||
      generateDescriptionInstructions !== store.storeSettings.generateDescriptionInstructions ||
      exampleDescription !== store.storeSettings.exampleDescription
    ) {
      setFieldChanged(true);
    } else {
      setFieldChanged(false);
    }
  }, [
    storeName,
    storeDescription,
    bannedWords,
    selectImageInstructions,
    generateDescriptionInstructions,
    exampleDescription,
    store,
  ]);

  const saveSettings = async () => {
    await fetcherSubmit({ actionType: "updateStoreSettings" }, { method: "POST" });
  };

  return (
    <div className="flex flex-shrink-0 mb-6 border-b flex-wrap justify-end">
      <ActionButton text="Discard Changes" onClick={() => discardChanges()} disabled={!fieldChanged} />
      <ActionButton
        text="Save Changes"
        onClick={() => {}}
        noMarginRight
        disabled={!fieldChanged}
        // additionalClasses="bg-green-600"
      />
    </div>
  );
};

export default SettingsActionButtons;
