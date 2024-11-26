export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return passwordRegex.test(password)
  }
  
  export const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/
    return phoneRegex.test(phone)
  }
  
  export const getValidationErrors = (formData, role) => {
    const errors = {}
  
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
  
    if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number'
    }
  
    if (!formData.fullName?.trim()) {
      errors.fullName = 'Full name is required'
    }
  
    if (role === 'Guide') {
      if (!formData.experience) {
        errors.experience = 'Years of experience is required'
      }
      if (!formData.languages?.trim()) {
        errors.languages = 'Languages spoken is required'
      }
      if (!formData.phone || !validatePhone(formData.phone)) {
        errors.phone = 'Please enter a valid phone number'
      }
    }
  
    if (role === 'Business Owner') {
      if (!formData.businessName?.trim()) {
        errors.businessName = 'Business name is required'
      }
      if (!formData.location?.trim()) {
        errors.location = 'Business location is required'
      }
      if (!formData.phone || !validatePhone(formData.phone)) {
        errors.phone = 'Please enter a valid business phone number'
      }
    }
  
    return errors
  }
  