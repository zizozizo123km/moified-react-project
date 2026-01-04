import React, { useState } from 'react';
import { Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginPageProps {
  onLogin: () => void;
}

const REQUIRED_USER = "zinozino";
const REQUIRED_PASS = "zizozizo";

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === REQUIRED_USER && password === REQUIRED_PASS) {
      onLogin();
    } else {
      setError("اسم المستخدم أو كلمة المرور الذي أدخلته غير صحيح. هل نسيت كلمة المرور؟");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        
        {/* Facebook Branding */}
        <div className="text-center mb-10">
          <Facebook className="text-blue-600 mx-auto mb-2" size={60} />
          <h1 className="text-5xl font-bold text-blue-600 font-sans tracking-tight">facebook</h1> 
          <p className="text-gray-600 mt-4 text-lg">سجل الدخول أو أنشئ حسابًا جديدًا</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Input 
                type="text" 
                placeholder="البريد الإلكتروني أو رقم الهاتف" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-right h-12 text-base border-gray-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <Input 
                type="password" 
                placeholder="كلمة السر" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-right h-12 text-base border-gray-300 focus:border-blue-500"
              />
            </div>
            
            {error && (
              <p className="text-red-600 text-sm text-center bg-red-100 p-2 rounded-md border border-red-300">
                {error}
              </p>
            )}
            
            {/* Login Button (Facebook Blue) */}
            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  جاري تسجيل الدخول...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </form>

          {/* Separator and Forgotten Password */}
          <div className="mt-4 text-center">
             <a href="#" className="text-sm text-blue-600 hover:underline">هل نسيت كلمة السر؟</a>
          </div>
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">أو</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {/* Create New Account Button (Facebook Green) */}
          <Button 
            variant="default"
            className="w-full h-12 text-lg bg-green-500 hover:bg-green-600 text-white"
          >
            إنشاء حساب جديد
          </Button>
          
        </div>
        
        {/* Footer/Meta text */}
        <div className="text-center mt-6 text-xs text-gray-500">
            <p className="font-semibold text-sm text-gray-700 mb-2">إنشاء صفحة لشخصية مشهورة أو علامة تجارية أو عمل.</p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;