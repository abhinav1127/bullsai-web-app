import React from "react";

const Prose: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="prose prose-a:text-blue-600 text-black prose-neutral">{children}</div>;
};

export default Prose;
