import express from 'express' ;
import { auth } from '../middleware/auth.middleware.js';
import { getChats } from '../controllers/chat.controller.js';
const chatRouter = express.Router() ; 
chatRouter.route('/').get(auth , getChats) ;

export {chatRouter} ; 
