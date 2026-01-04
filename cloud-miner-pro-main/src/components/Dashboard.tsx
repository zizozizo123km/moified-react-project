import React, { useState } from 'react';
import { Home, Users, Bell, Menu, Search, MessageSquare, LogOut } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

// --- Placeholder Components for Facebook Tabs ---
const FeedTab: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">آخر الأخبار</h2>
    <div className="space-y-4">
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">منشور تجريبي 1:</p>
        <p className="text-gray-600">مرحباً بكم في واجهة فيسبوك الجديدة!</p>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">منشور تجريبي 2:</p>
        <p className="text-gray-600">هذه محاكاة لواجهة الهاتف المحمول.</p>
      </div>
    </div>
  </div>
);

const FriendsTab: React.FC = () => (
  <div className="p-4 text-center bg-white rounded-lg shadow-md border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-2">الأصدقاء/المشاهدة</h2>
    <p className="text-gray-600">قائمة الأصدقاء أو الفيديوهات المقترحة هنا.</p>
  </div>
);

const NotificationsTab: React.FC = () => (
  <div className="p-4 text-center bg-white rounded-lg shadow-md border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-2">الإشعارات</h2>
    <p className="text-gray-600">لا يوجد إشعارات جديدة حالياً.</p>
  </div>
);

const MenuTab: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">القائمة</h2>
        <div className="border-t border-gray-200 pt-4">
            <button 
                onClick={onLogout} 
                className="w-full text-right p-3 bg-red-500 text-white font-semibold rounded-lg flex items-center justify-end space-x-2 rtl:space-x-reverse hover:bg-red-600 transition"
            >
                <span>تسجيل الخروج</span>
                <LogOut size={20} />
            </button>
        </div>
    </div>
);

// --- Bottom Navigation Component (Simplified Facebook Style) ---
interface NavItem {
    id: string;
    icon: React.ElementType;
    label: string;
}

interface FacebookBottomNavProps {
    items: NavItem[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const FacebookBottomNav: React.FC<FacebookBottomNavProps> = ({ items, activeTab, onTabChange }) => (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-xl h-14">
        <div className="flex justify-around items-center h-full max-w-lg mx-auto">
            {items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`flex flex-col items-center justify-center h-full w-full transition-colors relative group`}
                    >
                        <item.icon 
                            size={24} 
                            className={isActive ? 'text-[#1877F2]' : 'text-gray-500 group-hover:text-gray-700'} 
                        />
                        {/* Facebook typically doesn't show labels on bottom nav, but we keep them for context */}
                        {isActive && (
                            <div className="absolute top-0 w-full h-0.5 bg-[#1877F2]"></div>
                        )}
                    </button>
                );
            })}
        </div>
    </nav>
);
// ----------------------------------------------------------------

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('feed');

  // Navigation items updated for Facebook context
  const navItems: NavItem[] = [
    { id: 'feed', icon: Home, label: 'الصفحة الرئيسية' },
    { id: 'friends', icon: Users, label: 'الأصدقاء' },
    { id: 'notifications', icon: Bell, label: 'الإشعارات' },
    { id: 'menu', icon: Menu, label: 'القائمة' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedTab />;
      case 'friends':
        return <FriendsTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'menu':
        return <MenuTab onLogout={onLogout} />;
      default:
        return <FeedTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900" dir="rtl">
      
      {/* Facebook Style Header (Top Bar) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm p-3 flex items-center justify-between h-14 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1877F2]">facebook</h1>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition">
            <Search size={20} className="text-gray-700" />
          </div>
          <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition">
            <MessageSquare size={20} className="text-gray-700" />
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto relative min-h-screen">
        <div className="space-y-4">
            {renderTabContent()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <FacebookBottomNav 
        items={navItems} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Dashboard;