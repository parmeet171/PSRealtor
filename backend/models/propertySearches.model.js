import mongoose from 'mongoose' ;
const propertySearchesSchema = new mongoose.Schema({
    property : {
         type : mongoose.Schema.Types.ObjectId , 
        ref : "Property"
    } ,
    count : {
        type : Number , 
        default : 0 
    }
} , {timestamps : true }) ;

const PropertySearch = mongoose.model('PropertySearch' , propertySearchesSchema) ;
export {PropertySearch} ; 
