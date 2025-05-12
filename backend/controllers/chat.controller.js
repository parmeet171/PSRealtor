import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Chat } from "../models/chat.model.js";


const getChats = asyncHandler(async (req , res , next) => {
    if(!req?.user)
    {
        throw new ApiError(401 , "Unauthorized user") ;
    }

    const chats = await Chat.find({$or : [{sender : req?.user?._id } , {receiver : req?.user?._id} ] }).populate('sender').populate('receiver') ; 
    if(!chats ) 
    {
        throw new ApiError(500 , "Something went wrong") ;
    }
    return res.status(200).json(new ApiResponse(200 , chats , {messages : "all chats "}) ) ;
})

export {getChats} ; 
