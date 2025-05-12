import express from 'express' ;
import { createMessage ,getMessages } from '../controllers/message.controller.js'; 
import { auth } from '../middleware/auth.middleware.js';
const messageRouter = express.Router() ;
messageRouter.route('/').post(auth , createMessage) ;
messageRouter.route('/:id').get(auth , getMessages);
export {messageRouter} ;