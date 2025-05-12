import mongoose from 'mongoose' ;
const mostLikedPropertiesSchema = new mongoose.Schema({
    property : {
         type : mongoose.Schema.Types.ObjectId , 
        ref : "Property"
    } ,
    likeCount : {
        type : Number , 
        default : 0 
    }
} , {timestamps : true }) ;

const MostLikedProperties = mongoose.model('MostLikedProperties' , mostLikedPropertiesSchema) ;

export {MostLikedProperties} ; 