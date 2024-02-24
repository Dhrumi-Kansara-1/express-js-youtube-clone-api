const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next)
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
} 

export { asyncHandler }

// const asyncHandler = (requestHandler) => {
//   ;(req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//   }
// }
