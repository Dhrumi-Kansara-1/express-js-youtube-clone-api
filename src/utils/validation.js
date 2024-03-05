function isValidEmail(email) {
  // You can use a regular expression for a basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
 
export {
  isValidEmail,
}