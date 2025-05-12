import mongoose from 'mongoose' ; 
const likedPropertySchema = new mongoose.Schema({
    property : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Property"
    } ,
    user  : {
        type : mongoose.Schema.Types.ObjectId ,
        ref  :"User"
    }
} , {timestamps : true } ) ;
const LikedProperty = mongoose.model('LikedProperty' , likedPropertySchema) ; 
export {LikedProperty} ;


