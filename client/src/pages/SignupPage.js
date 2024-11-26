'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, User, Lock, Mail, MapPin, Building, Briefcase, Phone, Globe, Award } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

// Role fields configuration
const roleFields = {
  Guide: [
    { name: "experience", label: "Years of Experience", icon: Briefcase, type: "number", placeholder: "Years as a guide" },
    { name: "languages", label: "Languages Spoken", icon: Globe, type: "text", placeholder: "e.g. English, Spanish, French" },
    { name: "specialization", label: "Specialization", icon: Award, type: "text", placeholder: "e.g. Mountain Trekking, City Tours" },
    { name: "phone", label: "Contact Number", icon: Phone, type: "tel", placeholder: "Your phone number" },
  ],
  "Business Owner": [
    { name: "businessName", label: "Business Name", icon: Building, type: "text", placeholder: "Your business name" },
    { name: "businessType", label: "Business Type", icon: Briefcase, type: "text", placeholder: "e.g. Hotel, Restaurant, Tour Agency" },
    { name: "location", label: "Business Location", icon: MapPin, type: "text", placeholder: "Business address" },
    { name: "phone", label: "Business Phone", icon: Phone, type: "tel", placeholder: "Business contact number" },
  ]
}

const Signup = () => {
  const { signup, googleAuth, completeGoogleSignup, error } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState("Tourist")
  const [showRoleOptions, setShowRoleOptions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ role: "Tourist" })
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(null)
  const [isGoogleSignup, setIsGoogleSignup] = useState(false)
  const [partialGoogleUser, setPartialGoogleUser] = useState(null)
  const [formErrors, setFormErrors] = useState({})

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setShowRoleOptions(false)
    setFormData(prev => ({
      ...prev,
      role: selectedRole
    }))
    setFormErrors({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear the error for this field when the user starts typing
    setFormErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const errors = {}
    
    // Validate common fields
    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Name is required'
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required'
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long'
    }

    // Validate role-specific fields
    if (role !== 'Tourist') {
      roleFields[role].forEach(field => {
        if (!formData[field.name] || formData[field.name].trim() === '') {
          errors[field.name] = `${field.label} is required`
        }
      })
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      const result = await googleAuth();
      if (result.userExists) {
        setFormSuccess('You already have an account. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else if (result.needsProfileCompletion) {
        setIsGoogleSignup(true);
        setPartialGoogleUser(result.partialUser);
      } else {
        setFormSuccess('Google signup successful!');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      console.error('Google signup error:', error);
      setFormError(error.message || 'Failed to sign up with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)
    setFormSuccess(null)
    
    if (!validateForm()) {
      setIsLoading(false)
      return
    }
    
    try {
      let user;
      if (isGoogleSignup) {
        user = await completeGoogleSignup({ ...partialGoogleUser, ...formData })
      } else {
        const { email, password, name, role, ...additionalInfo } = formData
        user = await signup(email, password, name, role, additionalInfo)
      }
      
      setFormSuccess('Signup successful!')
      
      if(user.role == "Tourist" ){
        setTimeout(() => navigate('/login'), 2000)
      }
      else{
        if (user.isProfileComplete) {
          setTimeout(() => navigate('/login'), 2000)
        } else {
          setFormError('Please complete your profile to continue.')
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      if (error.message.includes('User already exists')) {
        setFormError('An account with this email already exists. Please try logging in.')
      } else {
        setFormError(error.message || 'Failed to create account')
      }
    } finally {
      setIsLoading(false)
    }
  }

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
      {/* Left Section - Sign Up Form */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-[35%] min-h-screen p-6 sm:p-8 md:p-10 lg:p-12 flex items-center justify-center"
      >
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2 sm:space-y-3"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800">Join Our Travel Community</h1>
            <p className="text-emerald-600 text-base sm:text-lg lg:text-xl">Start your journey with us today</p>
          </motion.div>

          {!isGoogleSignup && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 sm:gap-4 bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-3 lg:py-4 px-4 sm:px-6 text-emerald-700 hover:bg-emerald-50 transition duration-300 text-base sm:text-lg lg:text-xl font-medium"
            >
              <img src="/images/google.png" alt="Google" className="w-6 h-6" />
              Continue with Google
            </motion.button>
          )}

          {!isGoogleSignup && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-emerald-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 sm:px-6 bg-white text-emerald-700 text-sm sm:text-base lg:text-lg">Or continue with email</span>
              </div>
            </div>
          )}

          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success: </strong>
              <span className="block sm:inline">{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {!isGoogleSignup && (
              <>
                <div className="relative">
                  <User className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-emerald-700 h-4 sm:h-5 w-4 sm:w-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm sm:text-base lg:text-lg"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>

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
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
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
                  {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                </div>
              </>
            )}

            <div className="relative">
              <Globe className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-emerald-700 h-4 sm:h-5 w-4 sm:w-5" />
              <button
                type="button"
                className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-emerald-700 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base lg:text-lg"
                onClick={() => setShowRoleOptions(!showRoleOptions)}
              >
                {formData.role || "Select Role"}
                <ChevronDown className="absolute right-3 sm:right-4 top-3 sm:top-3.5 text-emerald-400 h-4 sm:h-5 w-4 sm:w-5" />
              </button>
              <AnimatePresence>
                {showRoleOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 w-full bg-white rounded-2xl shadow-lg border-2 border-emerald-100"
                  >
                    {["Tourist", "Guide", "Business Owner"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleRoleSelect(option)}
                        className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 hover:bg-white text-emerald-700 first:rounded-t-2xl last:rounded-b-2xl text-sm sm:text-base lg:text-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {formData.role !== "Tourist" && roleFields[formData.role] && (
                <motion.div
                  key={formData.role}
initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {roleFields[formData.role].map((field) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative"
                    >
                      <field.icon className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-emerald-700 h-4 sm:h-5 w-4 sm:w-5" />
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-emerald-200 rounded-full py-2 sm:py-3 pl-10 sm:pl-12 pr-4 text-emerald-700 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm sm:text-base lg:text-lg"
                      />
                      {formErrors[field.name] && <p className="text-red-500 text-xs mt-1">{formErrors[field.name]}</p>}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 sm:py-3 lg:py-4 rounded-full text-base sm:text-lg lg:text-xl font-semibold hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <p className="text-center text-emerald-600 text-sm sm:text-base lg:text-lg">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-800 font-semibold hover:underline">
              Log In
            </a>
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
              Discover Amazing Places
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200"
            >
              Connect with travelers, guides, and local businesses worldwide. Your next adventure begins here!
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup

