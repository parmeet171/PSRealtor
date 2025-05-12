import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {setToken } from '../service/auth.js' ;
import mongoose from "mongoose";
import {uploadOnCloundinary} from '../utils/cloundinary.js';
import { PropertySearch } from "../models/propertySearches.model.js";


const registerUserHandler = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body) ;

  if (!name || !email || !password) {
    throw new ApiError(
      400,
      "Please provide all fields : name , email and password are required "
    );
  }
  const alreadyRegistered = await User.findOne({ email });
  if (alreadyRegistered) {
    throw new ApiError(409, "User already exists with this username or email");
  }

  const user = await User.create({ name, email, password });
  if (!user) {
    throw new ApiError(500, "Something went wrong");
  }

  const token = setToken(user) ;


  return res
    .status(201)
    .cookie("accessToken" , token) 
    .json(new ApiResponse(201, {user , token }, "successfully registered"));
});


const userLoginHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw ApiError(
      400,
      "please provide all fields : email and password are required"
    );
  }
  const alreadyRegistered = await User.findOne({ email });
  if (!alreadyRegistered) {
    throw new ApiError(404, "User with this email not found");
  }
  const validateUser = await bcrypt.compare(
    password,
    alreadyRegistered.password
  );
  if (!validateUser) {
    throw new ApiError(400, "Invalid password ");
  }

  const user = await User.findOne({email : alreadyRegistered.email}).select("name email avatar") ;
  const token = setToken(user) ;
  return res.
  status(200)
  .cookie("accessToken" , token )
  .json(new ApiResponse(200 , {user , token }  , "successfully logged in"))  ;
});

const uploadProfilePhoto = asyncHandler(async (req, res , next) => {
  if(!req?.file) 
  {
    throw new ApiError(400 , "Please provide image") ;
  }
  const filePath = req?.file?.path; 
  const fileURL = await uploadOnCloundinary(filePath) ;
  if(!fileURL)
    {
      throw new ApiError(500 , "Something went wrong while uploading photo , Try again later") ;
    }
    console.log(req.user) ;


  const user = await User.findOne({_id : req?.user?._id});
  if(!user) 
  {
    throw new ApiError(401 , "Unauthorized user") ;

  }
  const upadteProfilePhoto = await User.findByIdAndUpdate({_id : user?._id} , {avatar : fileURL} , {new  : true }) ;
  return res.status(200).json(new ApiResponse(200 , upadteProfilePhoto , {message : "Profile photo updated"})) ;

})


const updatePassword = asyncHandler(async (req , res , next) => {
  const {newPassword , oldPassword  } = req.body ;
  if(!newPassword) 
  {
    throw new ApiError(400 , "Please provide the password to update") ;
  }
  if(!req?.user) 
  {
    throw new ApiError(401 , "Unauthorized user" )
  }
  const user = await User.findOne({_id : req?.user?._id}) ; 
  if(!user) 
  {
    throw new ApiError(400 , "No such user exists") ;
  }
  const isOldPasswordCorrect= await bcrypt.compare(oldPassword , user?.password ) ;
  if(!isOldPasswordCorrect) 
  {
    throw new ApiError(400 , "Invalid old password ") ;
    
  }
  user.password = newPassword ;
  await user.save() ; 
  return res.status(200).json(new ApiResponse(200 , user , {message : "password updated"})) ;
}) ;

const getUser = asyncHandler(async(req , res , next) => {
  if(!req?.user ) 
  {
    throw new ApiError(401 , "Unauthorized userr") ;
  }

  const user = await User.findOne({_id : req?.user?._id}) ;
  if(!user) 
  {
    throw new ApiError(500 , 'Something went wrong') ;
  }
  return res.status(200).json(new ApiResponse(200 , user , {message : "user data"}) ) ;
}) ;

const modifyProfile = asyncHandler(async ( req , res , next ) => {
  console.log(req.body) ;

  if(!req?.user) 
    
  {
    throw new ApiError(401 , "Unauthorized user" ) ;
  }
  const {name , email , role , number } = req.body ; 
  if(!name || !email || !role  ) 
  { 
    throw new ApiError('Some fields are missing') ;
  }

  const validateUser = await User.findOne({_id : req?.user?._id}) ;
  if(!validateUser) 
  {
    throw new ApiError(401  , 'Unauthorized user')  ;
  }
  const updatedUser = await User.findByIdAndUpdate({_id : validateUser?._id } ,  {name , email ,role , number }  , {new : true } ) ; 

  return res.status(200).json(new ApiResponse(200 , updatedUser , {message  : "Profile updated successfully "})) ; 


  
})

const getUserDetails = asyncHandler(async(req , res , next) => {
  const id = req?.params?.id ;
  console.log(id) ;
  if(!id) 
    {
      throw new ApiError(400 , "Id not present")  ;
    } 
  if(!mongoose.isValidObjectId(id)) 
  {
    throw new ApiError(400 , "Invalid object id"); 
  }
  const user = await User.findOne({_id : id}) ;
  if(!user) 
  {
    throw new ApiError(500 , 'Something went wrong') ;
  }
  return res.status(200).json(new ApiResponse(200 , user , {message : "user details"})) ;

})

// 
const myRecentSearches = asyncHandler(async (req , res , next) => {
  if(!req?.user) 
  {
      throw new ApiError(401 , 'Unauthorized user') ;
  }
  const myRecentSearches = PropertySearch.find({user : req?.user?._id}).sort({'createdAt' : -1}).populate('user').populate('property');  
  if(!myRecentSearches)
  {
      throw new ApiError(500 , 'Something went wrong') ;
  }
  return res.status(200).json(new ApiResponse(200 , myRecentSearches , {message  :"My searches"})) ;
}) ;
export { registerUserHandler, userLoginHandler , uploadProfilePhoto , updatePassword  , getUser , modifyProfile , getUserDetails , myRecentSearches }; 

