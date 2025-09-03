
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
