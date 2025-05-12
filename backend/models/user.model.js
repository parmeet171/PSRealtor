import mongoose from 'mongoose' ;
import bcrypt from 'bcrypt' ;
const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true  ,

    }
    , 
    email : {
        type  :String, 
        unique : true  , 
        required : true  ,
    } , 
    password : {
        type : String , 
        required : true  , 
    } ,
    role  :{
        type : String , 
        default : 'user'
    } , 
    // liked property field to be added
    number : {
        type : String , 
        default : ''
    } , 
    avatar : {
        type : String  , 
        default : '' 

    } ,
    

} , {timestamps : true }  ) ;
userSchema.pre('save' , async function(next) {
    if(!this?.isModified('password')) return next() ;
    this.password = await bcrypt.hash(this.password ,  10  ) ;
    next() ; 
})


const User = mongoose.model('User' , userSchema) ; 
export default User; 

