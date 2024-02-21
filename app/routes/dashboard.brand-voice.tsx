import { useOutletContext } from "@remix-run/react";
import { useCallback, useState } from "react";
import type { OutletContextType } from "~/types/outletContextTypes";
import SettingsActionButtons from "./components/ActionButtons/SettingsActionButtons";
import { EditorWithMenu } from "./components/editVersion/TipTap";

interface TextSettingProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const TextSetting: React.FC<TextSettingProps> = ({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-semibold mb-1">{label}</label>
    <input
      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white cursor-text"
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TextAreaSetting: React.FC<TextSettingProps> = ({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-semibold mb-1">{label}</label>
    <textarea
      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white cursor-text"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
    />
  </div>
);

const RichTextSetting: React.FC<TextSettingProps> = ({ label, type, value, onChange }) => (
  <div className="mb-4 flex flex-col gap-2">
    <label className="block text-gray-700 text-sm font-semibold mb-1">{label}</label>
    <EditorWithMenu content={value} setEditedContent={onChange} />
  </div>
);

interface SettingGroupProps {
  title: string;
  children: React.ReactNode;
}

const SettingGroup: React.FC<SettingGroupProps> = ({ title, children }) => (
  <div className="flex flex-row m-8">
    <div className="w-1/4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <div className="w-3/4 max-w-3xl">
      <div className="rounded px-8 pt-6 pb-4 border shadow">{children}</div>
    </div>
  </div>
);

const BrandVoicePage = () => {
  const { fetcherSubmit, store } = useOutletContext<OutletContextType>();
  const [messaging, setMessaging] = useState(store.name);
  const [brandDescription, setBrandDescription] = useState(store.description);
  const [bannedWords, setBannedWords] = useState(store.storeSettings.bannedWords);
  const [descriptionInstructions, setDescriptionInstructions] = useState(
    store.storeSettings.generateDescriptionInstructions
  );
  const [exampleDescription, setExampleDescription] = useState(store.storeSettings.exampleDescription);

  const discardChanges = useCallback(() => {
    console.log("discardChanges");
    setMessaging(store.name);
    setBrandDescription(store.description);
    setBannedWords(store.storeSettings.bannedWords);
    setDescriptionInstructions(store.storeSettings.generateDescriptionInstructions);
    setExampleDescription(store.storeSettings.exampleDescription);
  }, [store]);

  return (
    <div className="flex flex-col ag-theme-quartz container mx-auto p-4 h-screen">
      <h1 className="text-3xl font-bold mb-8">Brand Voice</h1>
      <SettingsActionButtons
        messaging={messaging}
        brandDescription={brandDescription}
        bannedWords={bannedWords}
        generateDescriptionInstructions={descriptionInstructions}
        exampleDescription={exampleDescription}
        store={store}
        fetcherSubmit={fetcherSubmit}
        discardChanges={discardChanges}
      />
      <div className="container mx-auto p-4">
        <SettingGroup title="Brand Information">
          <TextAreaSetting
            label="Brand Description"
            type="text"
            value={brandDescription}
            onChange={(e) => setBrandDescription(e)}
          />
          <TextSetting label="Messaging & Tone" type="text" value={messaging} onChange={(e) => setMessaging(e)} />
        </SettingGroup>
        <hr className="my-8" />
        <SettingGroup title="AI Instructions">
          <TextSetting
            label="Banned Words"
            type="text"
            value={bannedWords.join(", ")}
            onChange={(e) => setBannedWords([e])}
          />
          <TextAreaSetting
            label="Description Instructions"
            type="text"
            value={descriptionInstructions}
            onChange={(e) => setDescriptionInstructions(e)}
          />
          <RichTextSetting
            label="Ideal Example Description"
            type="text"
            value={exampleDescription}
            onChange={(e) => setExampleDescription(e)}
          />
        </SettingGroup>
      </div>
    </div>
  );
};

export default BrandVoicePage;
