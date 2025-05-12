import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError.js";
import path from 'path' ;


cloudinary.config({
  cloud_name: "dbnivp7nr",
  api_key: "734899159222835",
  api_secret: "iuM8fMkZgjoOtmniPW7NaggyVCA",
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
