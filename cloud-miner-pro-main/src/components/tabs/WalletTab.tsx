import React, { useState } from 'react';
import { Copy, CheckCircle2, CreditCard, Wallet2, ChevronLeft, Shield, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const MY_WALLET = "TYu89XpQzL1mK9vN2bR5sW7tE4yG6hJ3fA";

type PaymentMethod = 'usdt' | 'paypal' | 'card';

const WalletTab: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [amount, setAmount] = useState('50');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MY_WALLET);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ عنوان المحفظة بنجاح",
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    toast({
      title: "تم استلام طلبك!",
      description: "سيتم تفعيل حسابك خلال دقائق",
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      // Ensure the slash is correctly placed and only 4 digits are accepted after it
      let formatted = v.substring(0, 2);
      if (v.length > 2) {
        formatted += '/' + v.substring(2, 4);
      }
      return formatted;
    }
    return v;
  };

  if (!selectedMethod) {
    return (
      <div className="space-y-6 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 gradient-gold rounded-3xl mb-4 shadow-gold animate-float">
            <Wallet2 size={40} className="text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-black text-gradient-gold">اختر طريقة الدفع</h2>
          <p className="text-muted-foreground mt-2">اختر الطريقة المناسبة لإيداع الأموال</p>
        </div>

        {/* Amount Selection */}
        <div className="glass-premium rounded-3xl p-6">
          <label className="block text-sm font-bold text-muted-foreground mb-3">المبلغ المراد إيداعه (USD)</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['50', '100', '500', '1000'].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`py-3 rounded-xl font-bold transition-all ${
                  amount === val 
                    ? 'gradient-gold text-primary-foreground shadow-gold' 
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="أو أدخل مبلغ مخصص"
            className="text-center text-xl font-bold"
          />
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          {/* USDT */}
          <button
            onClick={() => setSelectedMethod('usdt')}
            className="w-full glass-premium rounded-3xl p-6 flex items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-white">₮</span>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-xl font-black text-foreground">USDT (TRC20)</h3>
              <p className="text-sm text-muted-foreground">تحويل فوري • بدون رسوم</p>
            </div>
            <ChevronLeft className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* PayPal */}
          <button
            onClick={() => setSelectedMethod('paypal')}
            className="w-full glass-premium rounded-3xl p-6 flex items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className="w-16 h-16 gradient-paypal rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-white">P</span>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-xl font-black text-foreground">PayPal</h3>
              <p className="text-sm text-muted-foreground">آمن وسريع • رسوم 2%</p>
            </div>
            <ChevronLeft className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* Credit Card */}
          <button
            onClick={() => setSelectedMethod('card')}
            className="w-full glass-premium rounded-3xl p-6 flex items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className="w-16 h-16 gradient-visa rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <CreditCard className="text-white" size={28} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-xl font-black text-foreground">بطاقة ائتمان</h3>
              <p className="text-sm text-muted-foreground">Visa / MasterCard • رسوم 3%</p>
            </div>
            <ChevronLeft className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield size={16} className="text-success" />
            <span>دفع آمن 100%</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock size={16} className="text-primary" />
            <span>تشفير SSL</span>
          </div>
        </div>
      </div>
    );
  }

  // USDT Payment
  if (selectedMethod === 'usdt') {
    return (
      <div className="space-y-6 animate-scale-in">
        <button 
          onClick={() => setSelectedMethod(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={20} />
          <span>العودة</span>
        </button>

        <div className="glass-premium rounded-[2.5rem] p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl font-black text-white">₮</span>
          </div>
          <h2 className="text-2xl font-black mb-2 text-foreground">
            إيداع USDT (TRC20)
          </h2>
          <p className="text-primary text-3xl font-black mb-6">${amount}</p>
          
          {/* QR Code placeholder */}
          <div className="bg-white p-6 rounded-3xl inline-block mb-6 shadow-xl">
            <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-2xl">
              <div className="text-center">
                <div className="grid grid-cols-5 gap-1 p-4">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-transparent'}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-500 mt-2 block">USDT TRC20</span>
              </div>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="glass rounded-2xl p-4 flex items-center gap-3 mb-6">
            <Button 
              onClick={handleCopy}
              variant="gold"
              size="icon"
              className="shrink-0"
            >
              <Copy size={20} />
            </Button>
            <span className="text-[11px] md:text-sm font-mono break-all text-muted-foreground flex-1 text-left">
              {MY_WALLET}
            </span>
          </div>

          {/* Instructions */}
          <div className="space-y-3 text-sm text-right bg-primary/5 p-5 rounded-2xl border border-primary/20">
            <p className="flex items-center gap-2 font-bold text-foreground">
              <CheckCircle2 className="text-primary shrink-0" size={18} /> 
              أرسل ${amount} USDT للعنوان أعلاه
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="text-muted-foreground shrink-0" size={18} /> 
              سيتم تفعيل حسابك تلقائياً (1-3 دقائق)
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="text-muted-foreground shrink-0" size={18} /> 
              تأكد من اختيار شبكة TRC20
            </p>
          </div>
        </div>
        
        <Button variant="success" size="lg" className="w-full h-16 text-lg shimmer" onClick={handlePayment}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              جاري التحقق...
            </span>
          ) : (
            'لقد قمت بالدفع، تحقق الآن'
          )}
        </Button>
      </div>
    );
  }

  // PayPal Payment
  if (selectedMethod === 'paypal') {
    return (
      <div className="space-y-6 animate-scale-in">
        <button 
          onClick={() => setSelectedMethod(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={20} />
          <span>العودة</span>
        </button>

        <div className="glass-premium rounded-[2.5rem] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-paypal rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-black text-white">P</span>
            </div>
            <h2 className="text-2xl font-black text-foreground">الدفع عبر PayPal</h2>
            <p className="text-primary text-3xl font-black mt-2">${amount}</p>
            <p className="text-muted-foreground text-sm mt-1">+ رسوم 2% = ${(parseFloat(amount) * 1.02).toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">البريد الإلكتروني PayPal</label>
              <Input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="example@email.com"
                className="text-left h-14"
                dir="ltr"
              />
            </div>

            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 space-y-2">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles size={16} className="text-primary" />
                سيتم إرسال رابط الدفع إلى بريدك الإلكتروني
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield size={16} className="text-success" />
                محمي بحماية PayPal للمشتري
              </p>
            </div>
          </div>
        </div>

        <Button 
          variant="gold" 
          size="lg" 
          className="w-full h-16 text-lg gradient-paypal border-0 shimmer" 
          onClick={handlePayment}
          disabled={!paypalEmail || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              جاري المعالجة...
            </span>
          ) : (
            'متابعة الدفع بـ PayPal'
          )}
        </Button>
      </div>
    );
  }

  // Credit Card Payment
  if (selectedMethod === 'card') {
    return (
      <div className="space-y-6 animate-scale-in">
        <button 
          onClick={() => setSelectedMethod(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={20} />
          <span>العودة</span>
        </button>

        <div className="glass-premium rounded-[2.5rem] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-visa rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CreditCard className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-black text-foreground">الدفع ببطاقة ائتمان</h2>
            <p className="text-primary text-3xl font-black mt-2">${amount}</p>
            <p className="text-muted-foreground text-sm mt-1">+ رسوم 3% = ${(parseFloat(amount) * 1.03).toFixed(2)}</p>
          </div>

          {/* Card Preview */}
          <div className="gradient-visa rounded-3xl p-6 mb-6 relative overflow-hidden aspect-[1.6/1] flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="flex justify-between items-start relative">
              <div className="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg" />
              <div className="text-white/80 text-sm font-bold">CREDIT</div>
            </div>
            <div className="relative">
              <p className="text-white/60 text-xs mb-1">رقم البطاقة</p>
              <p className="text-white text-xl font-mono tracking-wider" dir="ltr">
                {cardNumber || '•••• •••• •••• ••••'}
              </p>
            </div>
            <div className="flex justify-between items-end relative">
              <div>
                <p className="text-white/60 text-xs">الصلاحية</p>
                <p className="text-white font-mono">{cardExpiry || 'MM/YY'}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs">CVV</p>
                <p className="text-white font-mono">{cardCvv ? '•••' : '•••'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-2">رقم البطاقة</label>
              <Input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="text-left h-14 font-mono"
                dir="ltr"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">تاريخ الانتهاء</label>
                <Input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="text-center h-14 font-mono"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">CVV</label>
                <Input
                  type="password"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="•••"
                  maxLength={3}
                  className="text-center h-14 font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-60" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 opacity-60" />
            </div>
          </div>
        </div>

        <Button 
          variant="gold" 
          size="lg" 
          className="w-full h-16 text-lg shimmer" 
          onClick={handlePayment}
          disabled={!cardNumber || !cardExpiry || !cardCvv || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              جاري المعالجة...
            </span>
          ) : (
            `دفع $${(parseFloat(amount) * 1.03).toFixed(2)}`
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <Lock size={12} />
          بياناتك محمية بتشفير 256-bit SSL
        </p>
      </div>
    );
  }

  return null;
};

export default WalletTab;