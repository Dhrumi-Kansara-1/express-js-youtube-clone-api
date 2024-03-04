import {User} from "../modles/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "hello",
  })
})

export { registerUser }
