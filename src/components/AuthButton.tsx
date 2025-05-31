// src/components/AuthButton.tsx
import React from 'react';

interface AuthButtonProps {
  color: 'purple' | 'teal';
  onClick: () => void;
  label: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ color, onClick, label }) => {
  const colorClasses = {
    purple: 'bg-purple-600 hover:bg-purple-700',
    teal: 'bg-teal-600 hover:bg-teal-700'
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} w-full text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105`}
    >
      {label}
    </button>
  );
};

export default AuthButton;