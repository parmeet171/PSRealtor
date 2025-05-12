import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";
const createMessage = asyncHandler(async (req , res , next) => {
    const {message , receiver  } = req.body ; 
    if(!req?.user) 
    {
        throw new ApiError(401 , "Unauthorized user" ) ;
    }
    if(!message ) 
    {
        throw new ApiError(400 , "Message field is not present" )
    }
    if(!receiver) 
    {
        throw new ApiError(400 , "Empty receiver field received") ; 
    }
    if(!mongoose.isValidObjectId(receiver)) 
    {
        throw new ApiError(400 , "Invalid receiver id") ;
    }
    const createMessage = await Message.create({sender : req?.user?._id  , receiver , message }  )  ;
    const isMessageExists  = await Chat.findOne({$or : [{sender : req?.user?._id  , receiver} , {sender : receiver  , receiver : req?.user?._id } ] }) ; 
    if(isMessageExists)
    {
        // exists update
        await Chat.findByIdAndUpdate({_id : isMessageExists?._id} , {lastMessage : message} ) ;
    }
    else{
        // create 
        await Chat.create({sender : req?.user?._id  , receiver , lastMessage :message })
    }
    if(!createMessage) 
    {
        throw new ApiError(500 , "Something went wrong") ;
    }
    return res.status(201).json(new ApiResponse(201,  createMessage , {message : "message created"})) ;

})

const getMessages  = asyncHandler(async ( req , res , next) => {
    if(!req?.user) 
    {
        throw new ApiError(401 , "Unauthorized user") ;
    }
    const id = req.params.id ;
    if(!id) 
    {
        throw new ApiError(400 , "Id field not present") ;

    }
    if(!mongoose.isValidObjectId(id)) {
        throw new ApiError(400 , 'Invalid id') ;
    }
    const messages = await Message.find({$or : [{sender : req?.user?._id  , receiver : id } , {sender : id , receiver : req?.user?._id  } ] }).populate('sender').populate('receiver')
    if(!messages)
    {
        throw new ApiError(500 , "Something went wrong") ;
    }
    return res.status(200).json(new ApiResponse(200 , messages , {message : "all messages "})) ;    
}) ;







const getMyChats = asyncHandler(async(req  , res , next) => {
    if(!req?.user) 
    {
        throw new ApiError(401 , 'Unauthorized user') ;
    }
    const messages = await Message.find({$or : [{sender : req?.user?._id} , {receiver : req?.user?._id}]}) ;

    return res.status(200).json(new ApiResponse(200 , messages , {message : "My Chats"})) ; 






})



export {createMessage , getMessages , getMyChats } ; 
