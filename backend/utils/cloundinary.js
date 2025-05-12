import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError.js";
import path from 'path' ;
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloundinary = async (filePath) => {
 
  try {
    if (!filePath) {
      throw new ApiError(400, "File path not present");
      return null;
    }
    const response = await cloudinary.uploader.upload(filePath) ;
    const absoluteFilePath = path.join('/Users/hemantpaliwal/Desktop/RealEstateApp/backend/',filePath);
    
    return response?.url ; 

  } catch (err) {
    const absoluteFilePath = path.join('/Users/hemantpaliwal/Desktop/RealEstateApp/backend/',filePath); 
    
    console.log(err);
    console.log(err.message);
    return null ;
  }

};

export { uploadOnCloundinary };
