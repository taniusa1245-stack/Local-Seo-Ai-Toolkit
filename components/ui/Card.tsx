
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, icon: Icon, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-6 h-6 text-brand-blue mr-3" />}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
};

export default Card;
