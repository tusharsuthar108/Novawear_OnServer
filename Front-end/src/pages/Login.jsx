import { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShoppingBag, ArrowLeft, Shield, Zap, Heart } from 'lucide-react';
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
      // Simulate OTP send
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
      
      // Auto focus next input
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
      // Handle login success
    }
  };

  const resendOtp = () => {
    console.log('Resending OTP to:', mobile);
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-0">
        
        {/* Left Side - Branding & Content */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-32 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-white">ShopNow</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white leading-tight">
                Welcome back to your
                <span className="block text-blue-200">shopping paradise</span>
              </h1>
              
              <p className="text-lg text-blue-100 leading-relaxed">
                Discover millions of products, exclusive deals, and seamless shopping experience.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: Shield, text: 'Secure & Safe Shopping' },
                { icon: Zap, text: 'Lightning Fast Delivery' },
                { icon: Heart, text: 'Loved by 10M+ Customers' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-blue-100">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: '10M+', label: 'Happy Customers' },
                { number: '50K+', label: 'Products' },
                { number: '99.9%', label: 'Uptime' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">ShopNow</span>
              </div>

          {step === 1 ? (
            // Step 1: Mobile Number
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600">Enter your mobile number to continue</p>
              </div>

              <form onSubmit={handleMobileSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <Phone className="text-gray-400 w-5 h-5" />
                      <span className="text-gray-600 text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={mobile.length !== 10}
                  className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Send OTP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  New to ShopNow?{' '}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            // Step 2: OTP Verification
            <div className="space-y-6">
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
                <p className="text-gray-600">
                  Enter the 6-digit code sent to
                  <br />
                  <span className="font-medium text-gray-900">+91 {mobile}</span>
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      maxLength="1"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={otp.join('').length !== 6}
                  className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Verify & Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="text-center space-y-2">
                {timer > 0 ? (
                  <p className="text-gray-600 text-sm">
                    Resend OTP in <span className="font-medium text-blue-600">{timer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={resendOtp}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;