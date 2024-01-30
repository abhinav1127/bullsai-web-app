import { useEffect, useState } from "react";

function useSidebarState() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when the window size is larger than md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return { isSidebarOpen, toggleSidebar };
}

export default useSidebarState;
