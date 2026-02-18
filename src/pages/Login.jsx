import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginImg from '../assets/login.png';
import { loginUser } from '../redux/slice/authSlice'; // Fixed typo authslice -> authSlice if file is named correctly, assuming it is.
import { mergeCart } from '../redux/slice/cartSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
        if (cart?.products?.length > 0 && guestId) {
            dispatch(mergeCart({ guestId, userId: user._id })).then(() => {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            });
        } else {
            navigate(isCheckoutRedirect ? "/checkout" : "/");
        }
    }
  }, [user, navigate, cart, guestId, isCheckoutRedirect, dispatch]);

  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(""); // Clear previous errors

    // Simple email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full font-sans">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 bg-white animate-fade-in-up">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-sm space-y-6"
        >
          <div className="text-center mb-5">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2">Sign in to continue to Learning Lounge.</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="********"
              />
            </div>
          </div>

          <div>
             <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition duration-300 transform hover:-translate-y-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {localError && <p className="text-red-500 text-sm mt-3 text-center font-medium bg-red-50 p-2 rounded">{localError}</p>}
            {error && <p className="text-red-500 text-sm mt-3 text-center font-medium bg-red-50 p-2 rounded">{error}</p>}
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link 
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
               className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 relative bg-gray-900">
         <img 
            src={loginImg} 
            alt="Login" 
            className="absolute inset-0 w-full h-full object-cover opacity-80" 
          />
           <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent">
             <h2 className="text-3xl lg:text-4xl font-bold mb-4">Welcome to Learning Lounge</h2>
             <p className="text-base lg:text-lg opacity-90 max-w-md">Your gateway to mastering new skills and exploring endless possibilities.</p>
          </div>
      </div>
    </div>
  );
};

export default Login;