import { asyncHandler } from "../utils/asyncHandler.js";
import  ApiError  from "../utils/ApiError.js";
import ApiResponse  from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import mongoose from "mongoose";
import Property from "../models/property.model.js";
import User from "../models/user.model.js";
import { PropertySearch } from "../models/propertySearches.model.js";
import { MostLikedProperties } from "../models/mostLiked.model.js";




// property owner delete kar paye property ko mark as sold
// property searches recently searches 
// person contacted -- viewed your number
// all properties 
// all user --> dealer , owner , builder , user 
// properites sold  
// 



const registerAdmin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Please provide username and password");
  }

  const adminExists = await Admin.findOne({ username });
  if (adminExists) {
    throw new ApiError(409, "Admin with this username already exists");
  }
  const admin = await Admin.create({ username, password });

  return res
    .status(200)
    .json(new ApiResponse(200, admin, { message: "registration successfull" }));
});

const loginAdmin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Username and password are required for login");
  }
  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    throw new ApiError(
      400,
      "Invalid credentials : please check your username or password"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, admin, { message: "login successfull" }));
});

const getAllProperty = asyncHandler(async (req , res , next) => {
  const properties = await Property.find().populate('postedBy')  ; 
  if(!properties )
  {
    throw new ApiError(500 , 'Something went wrong') ;
  }
  return res.status(200).json(new ApiResponse(200 , properties , {message: 'All properties'})) ;
})

const deleteProperty = asyncHandler(async (req , res  , next) => {
  const id = req.params.id ; 
  if(!id) 
  {
    throw new ApiError(400 , 'Id not present') ;
  }
  if(!mongoose.isValidObjectId(id)) 
  {
    throw new ApiError(400 , 'Invalid id') ;
  }

  await Property.findByIdAndDelete({_id : id}) ;
  return res.status(200).json(new ApiResponse(200 , null  , {message : "property deleted "})) ;
})


const getAllUser = asyncHandler(async ( req , res , next) => {
  const users =await User.find() ; 
  if(!users) 
  {
    throw new ApiError(500 ,"Something went wrong") ;
  }
  return res.status(200).json(new ApiResponse(200 , users , {message : "all users"})) ;
})

const deleteUser = asyncHandler(async (req , res , next ) => {
  const id = req.params.id ; 
  if(!id) 
  {
    throw new ApiError(400 , 'Id not present') ;
  }
  if(!mongoose.isValidObjectId(id)) 
  {
    throw new ApiError(400 , 'Invalid id') ;
  }

  await User.findByIdAndDelete({_id : id}) ;
  return res.status(200).json(new ApiResponse(200 , null , {message  : "User deleted"})) ;
}) ;
const viewSoldProperty = asyncHandler(async (req , res , next ) => {
  const soldProperty = await Property.find({propertyStatus : "Sold"}) ;
  if(!soldProperty) 
  {
    throw new ApiError(500 , 'Something went wrong') ;
  }
  return res.status(200).json(new ApiResponse(200 , soldProperty , {message : "Sold properties"})) ;
})


const mostSearchedProperty = asyncHandler(async (req , res , next ) => {
  const properties = await PropertySearch.find().sort({'count' : -1}).populate('property') ;
  if(!properties) 
  {
    throw new ApiError(500 , 'Something went wrong') ;
  }
  return res.status(200).json(new ApiResponse(200 , properties , {message : "most searched  properties"})) ;
})

const mostLikedProperty = asyncHandler(async (req , res , next) => {
  const properties = await MostLikedProperties.find().sort({'likeCount'  : -1} ).populate('property') ;
  if(!properties) 
    {
      throw new ApiError(500 , 'Something went wrong') ;
    }

    return res.status(200).json(new ApiResponse(200 , properties , {message : "most searched  properties"})) ;

})

const viewActiveProperty = asyncHandler(async (req , res , next) => {
  const activeProperties = await Property.find({propertyStatus : 'Active'}).populate('postedBy')  ;
  if(!activeProperties)
  {
    throw new ApiError(500 , 'Something went wrong') ;
  }

  return  res.status(200).json(new ApiResponse(200 , activeProperties , {message : "Active Properties"})) ;
})

const viewSoldProperties = asyncHandler(async (req , res , next) => {
  const soldProperties = await Property.find({propertyStatus : 'Sold'}).populate('postedBy')  ;
  if(!soldProperties)
  {
    throw new ApiError(500 , 'Something went wrong') ;
  }

  return  res.status(200).json(new ApiResponse(200 , soldProperties , {message : "Sold Properties"})) ;
})


const propertyPostedCountPerUser = asyncHandler(async (req , res , next) => {
  const id = req.params.id ;

  const properties = await Property.find({postedBy : id }) ;
  if(!properties ) 
  {
    throw new ApiError(500 , 'Something went wrong');

  }
  return  res.status(200).json(new ApiResponse(200 , properties , {message : "properties "})) ;
})

const propertyOwners = asyncHandler(async (req , res , next) => {
  const owners = await User.find({role : 'Owner'}) ;
  if(!owners) {
    throw new ApiError(500 , 'Something went wrong') ;

  }
  return res.status(200).json(new ApiResponse(200 , owners , {message : ""} ))
})
const propertyBuilders = asyncHandler(async (req , res , next) => {
  const builders = await User.find({role : 'Builder'}) ;
  if(!builders) {
    throw new ApiError(500 , 'Something went wrong') ;

  }
  return res.status(200).json(new ApiResponse(200 , builders  , {message : ""}))
})

const propertyDealers = asyncHandler(async (req , res , next) => {
  const dealers = await User.find({role : 'Dealer'}) ;
  if(!dealers) {
    throw new ApiError(500 , 'Something went wrong') ;

  }
  return res.status(200).json(new ApiResponse(200 , dealers  , {message : ""}))
})


export {
  loginAdmin,
  registerAdmin,
  deleteProperty , 
  getAllProperty, 
  mostSearchedProperty, 
  viewSoldProperty ,
  deleteUser ,
  getAllUser, 
  mostLikedProperty  , 
  viewActiveProperty , 
  viewSoldProperties , 


  propertyPostedCountPerUser , 
  propertyOwners , 
  propertyBuilders , 
  propertyDealers , 



  
};
