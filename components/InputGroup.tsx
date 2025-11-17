
import React from 'react';

interface InputGroupProps {
  label: string;
  children: React.ReactNode;
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, children }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative flex items-stretch">
        {children}
      </div>
    </div>
  );
};
