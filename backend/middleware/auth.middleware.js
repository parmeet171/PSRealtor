import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { getToken } from "../service/auth.js";

const auth = asyncHandler(async (req , res , next) => {
    console.log('cookies = ' , req.cookies ) ;
    console.log('header auth = ' , req?.header('Authorization')) ;
    
    const token = req?.cookies?.['accessToken'] || req?.header('Authorization')?.split('Bearer ')[1] ;


    if(!token) {

        throw new ApiError(400 , 'Invalid token') ;
    }
    const user = getToken(token) ;
    

    const isValidUser = await User.findOne({_id : user?._id }) ;
    if(!isValidUser) 
    {
        throw new ApiError(401, 'Unauthorized userr') ;
    }
    req.user = user; 
    return next() ; 



})


export {auth} ;

