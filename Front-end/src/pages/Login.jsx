import { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShoppingBag, ArrowLeft, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

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
      console.log('Sending OTP to:', mobile);
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
      console.log('Verifying OTP:', otpValue, 'for mobile:', mobile);
    }
  };

  const resendOtp = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden">
      {/* Background Ambience - Adjusted for light mode */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-100/50 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-purple-100/50 blur-[120px]" />

      {/* Main Card Wrapper */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden grid lg:grid-cols-2 relative z-10">

        {/* Left Side - Visual & Brandy */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">ShopNow</span>
            </div>

            <h1 className="text-4xl font-bold text-white leading-tight mb-6">
              Welcome back to your
              <span className="block text-blue-100">digital paradise</span>
            </h1>

            <p className="text-blue-50/80 text-lg font-light leading-relaxed max-w-sm">
              Experience the future of shopping with our curated collection and seamless interface.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">10M+</div>
              <div className="text-xs text-blue-100">Happy Shoppers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="text-2xl font-bold text-white mb-1">50k+</div>
              <div className="text-xs text-blue-100">Premium Brands</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center relative bg-white">

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ShopNow</span>
          </div>

          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {step === 1 ? 'Sign In' : 'Verify Identity'}
              </h2>
              <p className="text-gray-500 text-sm">
                {step === 1 ? 'Access your account securely' : `Enter code sent to +91 ${mobile}`}
              </p>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                <form onSubmit={handleMobileSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Mobile Number</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3 border-r border-gray-200 pr-3">
                        <Phone className="text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                        <span className="text-gray-600 text-sm font-medium group-focus-within:text-gray-900">+91</span>
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full pl-[6rem] pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 outline-none hover:bg-gray-100 text-lg tracking-wide"
                        placeholder="00000 00000"
                        maxLength="10"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={mobile.length !== 10}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  >
                    <span>Get OTP</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors group text-sm"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Change Number</span>
                </button>

                <form onSubmit={handleOtpSubmit} className="space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <div key={index} className="relative">
                        <input
                          id={`otp-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 outline-none caret-blue-500"
                          maxLength="1"
                        />
                        {digit && (
                          <div className="absolute inset-0 border-2 border-blue-500/10 rounded-xl pointer-events-none animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={otp.join('').length !== 6}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black hover:shadow-lg hover:shadow-black/10 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span>Verify & Login</span>
                    <Shield className="w-5 h-5" />
                  </button>
                </form>

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-gray-400 text-sm">
                      Resend code in <span className="text-blue-600 font-medium">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={resendOtp}
                      className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors flex items-center justify-center space-x-2 mx-auto"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Resend Code</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Protected by NovaGuard Security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;