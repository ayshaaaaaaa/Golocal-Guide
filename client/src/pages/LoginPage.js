import React, { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const { login, googleAuth, checkUserExists, error } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [formError, setFormError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setFormError(null)
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await googleAuth();
      if (result.needsProfileCompletion) {
        navigate('/signup?google=true', { state: { partialUser: result.partialUser } });
      } else {
        navigate(getDashboardRoute(result.role));
      }
    } catch (error) {
      console.error('Google login error:', error);
      setFormError(error.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      const userExists = await checkUserExists(formData.email);
      if (!userExists) {
        setFormError("No account found with this email. Please sign up first.");
        setIsLoading(false);
        return;
      }
      const user = await login(formData.email, formData.password);
      navigate(getDashboardRoute(user.role));
    } catch (error) {
      console.error('Login error:', error);
      setFormError(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'Tourist':
        return '/tourist-dashboard'
      case 'Guide':
        return '/guide-dashboard'
      case 'Business Owner':
        return '/business-dashboard'
      default:
        return '/dashboard'
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Section - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[35%] min-h-screen p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center"
        >
          <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-2 sm:space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800">Welcome Back</h1>
              <p className="text-emerald-600 text-base sm:text-lg lg:text-xl">Log in to your account</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 sm:gap-4 bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-3 lg:py-4 px-4 sm:px-6 text-emerald-700 hover:bg-emerald-50 transition duration-300 text-base sm:text-lg lg:text-xl font-medium"
            >
              <img src="/images/google.png" alt="Google" className="w-6 h-6" />
              Continue with Google
            </motion.button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-emerald-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 sm:px-6 bg-white text-emerald-700 text-sm sm:text-base lg:text-lg">Or continue with email</span>
              </div>
            </div>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-emerald-700 h-4 sm:h-5 w-4 sm:w-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  onChange={handleInputChange}
                  className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm sm:text-base lg:text-lg"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-emerald-700 h-4 sm:h-5 w-4 sm:w-5" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleInputChange}
                  className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm sm:text-base lg:text-lg"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded-full text-base sm:text-lg lg:text-xl font-semibold hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </motion.button>
            </form>

            <p className="text-center text-emerald-600 text-sm sm:text-base lg:text-lg">
              Don't have an account?{" "}
              <Link to="/signup" className="text-emerald-800 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right Section - Hero Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[65%] relative bg-white"
          style={{ minHeight: '100vh' }}
        >
          <div className="absolute inset-0 lg:rounded-l-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/90 to-transparent z-10" />
            <div className="w-full h-full sticky top-0">
              <img
                src="/images/abcd.jpg"
                alt="Travel Destination"
                className="object-cover h-full w-full opacity-75"
                width="1920"
                height="1080"
              />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-white text-center p-4 sm:p-6 md:p-8 max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
              >
                Welcome Back Explorer
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200"
              >
                Your next adventure awaits. Log in to continue your journey!
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
