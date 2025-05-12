import jwt from 'jsonwebtoken' ;


const setToken = (user) => {
    if(!user) 
    {
        console.log("user object empty") ;
        return null ; 
    }
    const {_id , name , email} = user; 

    return jwt.sign({_id , name , email } ,process.env.SECRET_KEY ); 
}

const getToken = (token) => {
    if(!token) 
    {
        console.log("null token passed") ;
    }
    return jwt.verify(token , process.env.SECRET_KEY); 
}

export {setToken , getToken}  ;
