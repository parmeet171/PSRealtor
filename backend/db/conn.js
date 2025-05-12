import mongoose from 'mongoose' ;
import { dbName } from '../constatns.js';
import { configDotenv } from 'dotenv';

const connectToDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`connected to => ${conn.connection.name} `)  ; 
     }
    catch(err) 
    {
        console.log('mongo db  connection failed -> ' , err?.message) ; 
    }
}

export {connectToDB} ;
