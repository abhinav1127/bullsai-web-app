import React from "react";

const Prose: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="prose prose-a:text-blue-600 text-black prose-neutral max-w-full">{children}</div>;
};

export default Prose;
