import mongoose from 'mongoose' ;
const adminSchema = new mongoose.Schema({
    username  :{
        type : String ,
        unique : true ,
    } ,
    password : {
        type : String , 
        unique : true 
    } ,
} , {timestamps : true } )

const Admin = mongoose.model('Admin' , adminSchema) ;
export {Admin} ;
