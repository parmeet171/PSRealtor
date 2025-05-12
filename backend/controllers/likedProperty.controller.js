import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { LikedProperty } from "../models/likedProperty.model.js";
import { MostLikedProperties } from "../models/mostLiked.model.js";


const likeAProperty = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req?.user) {
    throw new ApiError(401, "Unauthroized user");
  }
  if (!id) {
    throw new ApiError(400, "Id not present");
  }
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid id");
  }

  const likedProperty = await LikedProperty.create({
    property: id,
    user: req?.user?._id,
  });
  const isPropertyExists = await  MostLikedProperties.findOne({property : id}) ; 
  if(isPropertyExists) 
  {
    isPropertyExists.likeCount = isPropertyExists.likeCount + 1; 
    await isPropertyExists.save()  ; 
  }
  else{
    await MostLikedProperties.create({property : id , likeCount : 1 })
  }

  if (!likedProperty) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, likedProperty, { message: "property liked" }));
});
const viewLikedProperties = asyncHandler(async (req, res, next) => {
    if(!req?.user)  
    {
        throw new ApiError(401 , "Unauthorized user") ;
    }
    const likedProperties = await LikedProperty.find({user : req?.user?._id}).populate({path : 'property' , populate : 'postedBy'}) ;
    return res.status(200).json(new ApiResponse(200 , likedProperties , {message : "All liked properties"}) ) ;
});

const checkIfLiked = asyncHandler(async(req , res , next) => {
  if(!req?.user ) 
  {
    throw new ApiError(401 , "Unauthorized user") ;
  }
  const id = req.params.id ;
  if(!id) 
  {
    throw new ApiError(400 , "Id not present") ;
  }
  if(!mongoose.isValidObjectId(id))
  {
    throw new ApiError(400 , "Invalid id"); 
  }

  const likedProperty = await LikedProperty.findOne({$and : [{user : req?.user?._id} , {property : id } ]}) ; 
  return res.status(200).json(new ApiResponse(200 , likedProperty , {message : ''})) ;



})

const deleteLikedProperty = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  
  if (!id) {
    throw new ApiError(400, "Id not present");
  }
  if(!mongoose.isValidObjectId(id)) 
  {
    throw new ApiError(400 , "Invalid id ") ; 

  }
  const deletedLikedProperty = await LikedProperty.deleteOne({property : id } , {new : true }) ;

  if(!deletedLikedProperty) 
  {
    throw new ApiError(500 , "Something went wrong") ;
  }
  return res.status(200).json(new ApiResponse(200 , deleteLikedProperty , {message : "property disliked"}) ) ;

});

export { likeAProperty , viewLikedProperties ,  deleteLikedProperty ,checkIfLiked  };
