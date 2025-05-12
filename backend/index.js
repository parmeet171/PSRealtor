import dotenv from 'dotenv' ;
import { connectToDB } from './db/conn.js';
import { connect } from 'mongoose';
import { server } from './app.js';
import path from 'path' ;


dotenv.config({
    path : './.env' , 
}) ; 

const PORT = process.env.PORT || 8001;
connectToDB().then(() => {
    server.listen(PORT , () => {
        console.log(`server listening at PORT => ${PORT}` )
    })
})
.catch((err) => {
    console.log("mongo db connection failed =>  "  , err.message) ; 
})












