import { useState, useEffect } from 'react';
import { Mail, ArrowRight, ShoppingBag, ArrowLeft, Shield, Zap, Lock, Key, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const API_BASE_URL = 'http://localhost:3000/api';

const Login = () => {
  const { syncCartOnLogin } = useCart();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' or 'password'
  const [email, setEmail] = useState('');
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load saved credentials on component mount
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

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

  const generateEmailSuggestions = (input) => {
    if (!input || input.includes('@')) return [];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    return domains.map(domain => `${input}@${domain}`);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    const suggestions = generateEmailSuggestions(value);
    setEmailSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0 && !value.includes('@'));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (email && email.includes('@') && password) {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${API_BASE_URL}/users/login-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Handle remember me functionality
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
          
          // Store user data
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('userId', data.user.user_id);
          
          // Sync cart on login
          await syncCartOnLogin(data.user.user_id);
          
          // Redirect based on role
          if (data.user.role_name === 'ADMIN') {
            window.location.href = '/admin/dashboard';
          } else {
            window.location.href = '/';
          }
        } else {
          setError(data.error || 'Login failed');
        }
      } catch (error) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Handle remember me for OTP login
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${API_BASE_URL}/users/send-login-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setStep(2);
          setTimer(30);
          setCanResend(false);
        } else {
          setError(data.error || 'Failed to send OTP');
        }
      } catch (error) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
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

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${API_BASE_URL}/users/verify-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: otpValue }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store user data
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('userId', data.user.user_id);
          
          // Sync cart on login
          await syncCartOnLogin(data.user.user_id);
          
          // Redirect based on role
          if (data.user.role_name === 'ADMIN') {
            window.location.href = '/admin/dashboard';
          } else {
            window.location.href = '/';
          }
        } else {
          setError(data.error || 'Invalid OTP');
        }
      } catch (error) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/send-login-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setTimer(30);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
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
                {step === 1 ? 'Access your account securely' : `Enter code sent to ${email}`}
              </p>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                {/* Login Method Toggle */}
                <div className="flex bg-gray-100 rounded-2xl p-1">
                  <button
                    onClick={() => setLoginMethod('otp')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      loginMethod === 'otp' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Key size={16} />
                    <span>Login with OTP</span>
                  </button>
                  <button
                    onClick={() => setLoginMethod('password')}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      loginMethod === 'password' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Lock size={16} />
                    <span>Login with Password</span>
                  </button>
                </div>

                {loginMethod === 'otp' ? (
                  <div className="space-y-5">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    <form onSubmit={handleEmailSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Mail className="text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          onFocus={() => setShowSuggestions(emailSuggestions.length > 0 && !email.includes('@'))}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 outline-none hover:bg-gray-100 text-lg"
                          placeholder="your@email.com"
                          autoComplete="email"
                          required
                        />
                        {showSuggestions && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                            {emailSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  setEmail(suggestion);
                                  setShowSuggestions(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!email || !email.includes('@') || loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                    >
                      <span>{loading ? 'Sending...' : 'Get OTP'}</span>
                      {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    <form onSubmit={handlePasswordSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Mail className="text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          onFocus={() => setShowSuggestions(emailSuggestions.length > 0 && !email.includes('@'))}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 outline-none hover:bg-gray-100 text-lg"
                          placeholder="your@email.com"
                          autoComplete="email"
                          required
                        />
                        {showSuggestions && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                            {emailSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  setEmail(suggestion);
                                  setShowSuggestions(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <Lock className="text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 outline-none hover:bg-gray-100 text-lg"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all">
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={!email || !email.includes('@') || !password || loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                    >
                      <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                      {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                  </div>
                )}

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
                  <span>Change Email</span>
                </button>

                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
                  <p><strong>🔐 Login OTP sent to:</strong> {email}</p>
                  <p className="text-xs mt-1">Check your inbox and spam folder. OTP expires in 10 minutes.</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

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
                    disabled={otp.join('').length !== 6 || loading}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black hover:shadow-lg hover:shadow-black/10 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span>{loading ? 'Verifying...' : 'Verify & Login'}</span>
                    {!loading && <Shield className="w-5 h-5" />}
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
                      disabled={loading}
                      className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4" />
                      <span>{loading ? 'Sending...' : 'Resend Code'}</span>
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