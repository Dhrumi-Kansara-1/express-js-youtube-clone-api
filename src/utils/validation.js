function isValidEmail(email) {
  // You can use a regular expression for a basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

console.log("validation.js - process.env:", process.env.CLOUDINARY_CLOUD_NAME)

export {
  isValidEmail,
}