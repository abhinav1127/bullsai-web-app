export const ActionButton: React.FC<{ text: string; onClick: () => void; noMarginRight?: boolean }> = ({
  text,
  onClick,
  noMarginRight,
}) => {
  return (
    <button
      className={`px-4 py-2 ${
        !noMarginRight && "mr-2"
      } mb-1 text-sm font-semibold bg-white text-black border border-gray-300 rounded hover:bg-gray-200 h-10 flex-shrink-0`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
