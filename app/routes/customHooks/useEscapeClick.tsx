import { useEffect } from "react";

function useEscapeClick(onEscape: () => void, isOpen: boolean) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onEscape]); // Only re-run the effect if isOpen or onClose changes
}

export default useEscapeClick;
