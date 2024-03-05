import { User } from "../modles/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { isValidEmail } from "../utils/validation.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res, next) => {
  //1 get user details from request
  const { username, email, fullname, password } = req.body

  //2.1 validation - not empty
  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  //2.2 validation - email
  if (!isValidEmail(email)) {
    throw new ApiError(400, "Email is invalid")
  }

  //3. check if user already exist [username,email]
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  })
  if (existedUser) {
    throw new ApiError(409, "Email or Username already exist")
  }

  //4.1 get avatar and cover image
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path
  // console.log("avatarLocalPath:", avatarLocalPath)
  // console.log("coverImageLocalPath:", coverImageLocalPath)

  //4.2 check if avatar exist
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  //5. if files exist --> upload them to cloudinary --> take url
  const avatarCloudinary = await uploadOnCloudinary({
    localFilePath: avatarLocalPath,
  })
  const coverImageCloudinary = await uploadOnCloudinary({
    localFilePath: coverImageLocalPath,
  })

  // console.log("avatarCloudinary:", avatarCloudinary)
  
  //6. check if avatar is uploaded on cloudinary
  if (!avatarCloudinary) {
    throw new ApiError(400, "Avatar is not uploaded")
  }

  //7. create user object --> create entry in db

  //7.1 saving username in lowercase
  //7.2 save "" in coverImage if url does not exist

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    fullname,
    password,
    avatar: avatarCloudinary.url,
    coverImage: coverImageCloudinary?.url || "",
  })

  //8.1 find user and select all fields except password and refresh token
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  //8.2 check if user is created [if null --> then user not created]
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user!")
  }

  //9. return response
  return res
    .status(201)
    .json(ApiResponse(201, createdUser, "User registered successfully"))
})

export { registerUser }
