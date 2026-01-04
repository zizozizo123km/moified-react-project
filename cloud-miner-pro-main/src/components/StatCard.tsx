import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend }) => {
  // Flat, white card design typical of Facebook's UI (e.g., Business Manager)
  const CARD_BG = 'bg-white shadow border border-gray-100'; 
  const ICON_WRAPPER = 'bg-gray-100 text-[#1877F2]'; // Light background, Facebook Blue icon color

  return (
    // Simplified card styling for a clean, non-glass look
    <div className={`${CARD_BG} rounded-lg p-4 transition-all duration-150 hover:shadow-lg`}>
      
      <div className="flex flex-col items-start">
        
        {/* Icon wrapper: simple, round, light background */}
        <div className={`mb-2 p-2 rounded-full ${ICON_WRAPPER}`}>
          {/* We ensure the icon uses the blue color via the wrapper's text color */}
          <span className="text-xl flex items-center justify-center">
             {icon}
          </span>
        </div>

        {/* Label (subdued gray) */}
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
          {label}
        </span>
        
        {/* Value (dark, prominent text) */}
        <span className="text-3xl font-bold text-gray-900 leading-none">
          {value}
        </span>
        
        {/* Trend line */}
        {trend && (
          // Using a standard modern success green
          <div className="flex items-center gap-1 mt-3 text-green-600 text-sm font-semibold">
            <TrendingUp size={14} />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;