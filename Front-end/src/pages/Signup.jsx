import { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShoppingBag, ArrowLeft, User, Mail, Shield, Zap, Gift, Star, Truck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP, 3: Details
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setStep(2);
      setTimer(30);
      setCanResend(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setStep(3);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    console.log('Creating account:', { mobile, ...userDetails });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resendOtp = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-100/50 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-violet-100/50 blur-[120px]" />

      {/* Main Card Wrapper */}
      <div className="w-full max-w-6xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid lg:grid-cols-2 relative z-10">

        {/* Left Side - Visual & Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">ShopNow</span>
            </div>

            <h1 className="text-4xl font-bold text-white leading-tight mb-6">
              Start your journey
              <span className="block text-indigo-100">with us today</span>
            </h1>

            <div className="space-y-6 mt-8">
              {[
                { icon: Gift, text: 'Exclusive Welcome Offers' },
                { icon: Star, text: 'Personalized Suggestions' },
                { icon: Truck, text: 'Free Delivery First Order' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-2 mb-2 text-amber-300">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-white/90 text-sm italic mb-4">"The best shopping experience I've ever had. Fast delivery and amazing quality!"</p>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-300 to-violet-300" />
              <div>
                <div className="text-white text-sm font-bold">Sarah Jenkins</div>
                <div className="text-indigo-100 text-xs">Verified Buyer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center relative bg-white order-1 lg:order-2">

          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-500 text-sm">Follow the steps to set up your profile</p>
            </div>

            {/* Progress Steps - FIXED UI */}
            <div className="flex items-center justify-between mb-12 px-2 relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0" />
              {[1, 2, 3].map((num) => (
                <div key={num} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${step === num
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110'
                    : step > num
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-white border-slate-200 text-slate-400'
                    }`}>
                    {step > num ? <Check className="w-5 h-5" /> : num}
                  </div>
                  <span className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${step >= num ? 'text-indigo-600' : 'text-slate-400'
                    }`}>
                    {num === 1 ? 'Mobile' : num === 2 ? 'Verify' : 'Details'}
                  </span>
                </div>
              ))}
            </div>

            {step === 1 ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <form onSubmit={handleMobileSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3 border-r border-slate-200 pr-3">
                        <Phone className="text-slate-400 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
                        <span className="text-slate-600 text-sm font-medium group-focus-within:text-slate-900">+91</span>
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full pl-[6rem] pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 text-slate-900 placeholder-slate-400 outline-none hover:bg-slate-100 text-lg"
                        placeholder="00000 00000"
                        maxLength="10"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={mobile.length !== 10}
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-indigo-500/30 hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none group"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="text-center pt-4 border-t border-slate-100">
                  <p className="text-slate-500 text-sm">
                    Already a member?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline transition-all">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <button onClick={() => setStep(1)} className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors group text-sm font-medium">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Use different number</span>
                </button>

                <form onSubmit={handleOtpSubmit} className="space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-14 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 text-slate-900 outline-none"
                        maxLength="1"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={otp.join('').length !== 6}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>Verify OTP</span>
                    <Shield className="w-5 h-5" />
                  </button>
                </form>

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-slate-400 text-sm">
                      Resend available in <span className="text-indigo-600 font-bold">{timer}s</span>
                    </p>
                  ) : (
                    <button onClick={resendOtp} className="text-slate-900 hover:text-indigo-600 font-bold text-sm transition-colors flex items-center justify-center space-x-2 mx-auto">
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Resend OTP</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <form onSubmit={handleDetailsSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">First Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                          type="text"
                          name="firstName"
                          value={userDetails.firstName}
                          onChange={handleDetailsChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={userDetails.lastName}
                        onChange={handleDetailsChange}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleDetailsChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-500 text-[10px] font-bold uppercase">Verified Number</div>
                        <div className="text-slate-900 font-bold">+91 {mobile}</div>
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-indigo-500/30 hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Complete Signup</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;