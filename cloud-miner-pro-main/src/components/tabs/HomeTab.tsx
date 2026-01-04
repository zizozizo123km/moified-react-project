import React from 'react';
import { Zap, Users, ArrowRightLeft, TrendingUp, Star, Sparkles, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import ReviewCard from '@/components/ReviewCard';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
}

// Define Facebook-like colors using standard Tailwind classes
const FB_BLUE = 'blue-600';
const FB_ACCENT_TEXT = 'blue-700';
const FB_BACKGROUND = 'gray-100'; // Represents #f0f2f5

const HomeTab: React.FC<HomeTabProps> = ({ onNavigate }) => {
  return (
    <div className={`space-y-6 p-3 bg-${FB_BACKGROUND} min-h-screen animate-fade-in`}>
      
      {/* Hero Promo Card - Simulating a Sponsored Post/Ad */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className={`p-5 md:p-6 bg-white`}>
          
          {/* Header/Sponsored Tag */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
              <Clock size={14} className="text-red-500" />
              عرض ترويجي محدود
            </div>
            <span className={`text-xs text-${FB_BLUE} font-medium`}>إعلان مُروج</span>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10">
            <h2 className={`text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 leading-snug`}>
              عرض الترحيب
              <br />
              <span className={`text-${FB_ACCENT_TEXT}`}>الخاص بك!</span>
            </h2>
            <p className="text-gray-600 font-medium mb-4 text-base">
              ادفع <span className={`text-red-600 text-xl font-bold`}>$50</span> واحصل على <span className={`text-${FB_ACCENT_TEXT} text-xl font-bold`}>$500</span> خلال 24 ساعة فقط!
            </p>
            
            <Button 
              onClick={() => onNavigate('wallet')} 
              size="lg"
              // Primary Facebook Blue Button Style
              className={`w-full bg-${FB_BLUE} text-white hover:bg-blue-700 shadow-lg h-12 text-base font-bold`}
            >
              استثمر الآن <Zap size={18} className="ml-2 fill-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Live Stats - Simulating a Dashboard Widget */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          // Update styling for FB look
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
          label="المستخدمين النشطين" 
          value="+45,201" 
          icon={<Users className={`text-${FB_BLUE}`} size={24} />}
          trend="+12%"
        />
        <StatCard 
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
          label="إجمالي السحوبات" 
          value="$2.4M" 
          icon={<ArrowRightLeft className="text-green-500" size={24} />}
          trend="+8%"
        />
      </div>

      {/* Features - Small Feature Blocks */}
      <div className="grid grid-cols-3 gap-3">
        {/* Replaced 'glass' and custom gradients with simple FB-like background cards */}
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-200">
          <div className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1`}>
            <Shield size={20} className={`text-${FB_BLUE}`} />
          </div>
          <p className="text-xs font-semibold text-gray-600">آمن 100%</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-200">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <Zap size={20} className="text-green-600" />
          </div>
          <p className="text-xs font-semibold text-gray-600">سحب فوري</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-200">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <Sparkles size={20} className="text-yellow-600" />
          </div>
          <p className="text-xs font-semibold text-gray-600">دعم 24/7</p>
        </div>
      </div>

      {/* Reviews Section - Simulating Facebook Comments/Posts */}
      <div className="space-y-3 bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center justify-between border-b pb-3 border-gray-100">
          <h3 className={`text-lg font-bold flex items-center gap-2 text-gray-800`}>
            <Star className={`text-yellow-400 fill-yellow-400`} size={20} /> 
            آراء المستثمرين (Reviews)
          </h3>
          <span className={`text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-medium`}>+2,340 تقييم</span>
        </div>
        <div className="space-y-4 pt-2">
          
          <ReviewCard 
            name="محمد العتيبي" 
            text="والله كنت شاك في البداية، لكن جربت الـ 50 دولار وفعلاً وصلتني 500 دولار في المحفظة بعد يوم واحد. شكراً للقائمين على الموقع!" 
            stars={5} 
            img="https://i.pravatar.cc/150?u=a1"
            date="منذ 2 ساعة"
            verified
            className="border-b pb-4 last:border-b-0"
          />
          <ReviewCard 
            name="سارة الهاشم" 
            text="أفضل منصة تعدين استخدمتها، نظام الـ VIP 3 خيالي والأرباح يومية. أنصح الجميع بالبدء فوراً." 
            stars={5} 
            img="https://i.pravatar.cc/150?u=a2"
            date="منذ 5 ساعات"
            verified
            className="border-b pb-4 last:border-b-0"
          />
          <ReviewCard 
            name="ياسين من المغرب" 
            text="خدمة دعم ممتازة وأرباح حقيقية. تم ترقية حسابي لـ VIP 1 والآن دخلي الشهري تضاعف." 
            stars={4} 
            img="https://i.pravatar.cc/150?u=a3"
            date="منذ يوم"
            verified
          />
        </div>
      </div>
    </div>
  );
};

export default HomeTab;