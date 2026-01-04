import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface BottomNavProps {
  items: NavItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ items, activeTab, onTabChange }) => {
  // Refactoring to resemble Facebook bottom navigation: white background, blue active indicator, icon-focused.
  // The standalone LogOut button is removed to match standard social app navigation structure.

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] p-0 flex justify-around items-center h-14 safe-area-inset-bottom z-50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex-1 h-full flex flex-col items-center justify-center transition-colors duration-200 relative 
              ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`
            }
            aria-label={item.label}
          >
            {/* Active Indicator Bar (Facebook style: subtle underline/bar) */}
            {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 transition-all duration-300" />
            )}
            
            <div className="pt-2">
              {/* Icon is primary focus. Use increased stroke weight for active state. */}
              <Icon size={26} strokeWidth={isActive ? 3 : 2} />
            </div>
            
            {/* Keeping the text label hidden or small if needed, but standard FB nav relies on icons. */}
            {/* If labels are mandatory, they should be very small/subtle. Reverting to original label size for compatibility, but styled minimally. */}
            {/* Note: Standard FB mobile nav usually omits text labels here. */}
            <span className={`text-[10px] font-medium transition-colors mt-1 ${
                isActive ? 'text-blue-600 opacity-100' : 'text-gray-500 opacity-80'
            }`}>
                {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;