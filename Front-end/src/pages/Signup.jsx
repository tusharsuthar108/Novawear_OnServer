import { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShoppingBag, ArrowLeft, User, Mail, Star, Gift, Truck } from 'lucide-react';
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
      console.log('OTP verified for:', mobile);
      setStep(3);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    console.log('Creating account:', { mobile, ...userDetails });
    // Handle account creation
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resendOtp = () => {
    console.log('Resending OTP to:', mobile);
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-0">
        
        {/* Left Side - Signup Form */}
        <div className="flex items-center justify-center p-4 lg:p-12 order-2 lg:order-1">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">ShopNow</span>
              </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= num ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step > num ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 ? (
            // Step 1: Mobile Number
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-600">Enter your mobile number to get started</p>
              </div>

              <form onSubmit={handleMobileSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
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
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          ) : step === 2 ? (
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
                <h2 className="text-2xl font-bold text-gray-900">Verify Mobile</h2>
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
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      maxLength="1"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={otp.join('').length !== 6}
                  className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Verify Mobile</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="text-center space-y-2">
                {timer > 0 ? (
                  <p className="text-gray-600 text-sm">
                    Resend OTP in <span className="font-medium text-purple-600">{timer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={resendOtp}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Step 3: User Details
            <div className="space-y-6">
              <button
                onClick={() => setStep(2)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Complete Profile</h2>
                <p className="text-gray-600">Tell us a bit about yourself</p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={userDetails.firstName}
                        onChange={handleDetailsChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="First name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userDetails.lastName}
                      onChange={handleDetailsChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleDetailsChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mobile Number</p>
                      <p className="text-sm text-gray-600">+91 {mobile} ✓</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          )}
            </div>
          </div>
        </div>

        {/* Right Side - Branding & Content */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-12 relative overflow-hidden order-1 lg:order-2">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-16 right-20 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-16 w-28 h-28 bg-white rounded-full"></div>
            <div className="absolute top-1/3 left-24 w-20 h-20 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-white">ShopNow</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white leading-tight">
                Join millions of
                <span className="block text-purple-200">happy shoppers</span>
              </h1>
              
              <p className="text-lg text-purple-100 leading-relaxed">
                Create your account and unlock exclusive deals, personalized recommendations, and premium shopping experience.
              </p>
            </div>
            
            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: Gift, text: 'Exclusive Welcome Offers' },
                { icon: Star, text: 'Personalized Recommendations' },
                { icon: Truck, text: 'Free Delivery on First Order' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-purple-100">{benefit.text}</span>
                </div>
              ))}
            </div>
            
            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RK</span>
                </div>
                <div>
                  <div className="text-white font-medium">Rahul Kumar</div>
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-purple-100 text-sm italic">
                "Amazing shopping experience! Fast delivery and great customer service. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;