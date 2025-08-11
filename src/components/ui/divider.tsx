import React from "react";

interface DividerProps {
  label: string;
  className?: string;
}

const Divider = ({ label, className }: DividerProps) => {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="flex-1 h-px bg-gray-200"></div>
      <span className="px-3 text-sm text-gray-400">{label}</span>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>
  );
};

export { Divider };
