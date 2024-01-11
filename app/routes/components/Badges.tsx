export const InformationCardBadge: React.FC<{ header: string }> = ({ header }) => {
  return (
    <div className="flex justify-center">
      <span className="flex-initial px-3 py-0.5 text-gray-400 bg-white text-xs rounded-full uppercase font-semibold tracking-wide self-start -mb-3 z-10">
        {header}
      </span>
    </div>
  );
};
