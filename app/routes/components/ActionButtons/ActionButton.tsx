export const ActionButton: React.FC<{
  text: string;
  onClick: () => void;
  noMarginRight?: boolean;
  disabled?: boolean;
  additionalClasses?: string;
}> = ({ text, onClick, noMarginRight, additionalClasses, disabled = false }) => {
  return (
    <button
      className={`px-4 py-2 ${!noMarginRight && "mr-2"} mb-1 text-sm font-semibold ${additionalClasses} ${
        disabled ? "bg-gray-200 text-gray-500" : "bg-white text-black"
      } border border-gray-300 rounded hover:bg-gray-200 h-10 flex-none`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
