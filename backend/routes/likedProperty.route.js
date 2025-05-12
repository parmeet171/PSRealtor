import express from 'express' ; 
import { likeAProperty , viewLikedProperties ,  deleteLikedProperty , checkIfLiked} from '../controllers/likedProperty.controller.js'; 
import { auth } from '../middleware/auth.middleware.js';
const likedPropertyRouter = express.Router() ;
likedPropertyRouter.route('/create/:id').post(auth ,likeAProperty ) ; 
likedPropertyRouter.route('/').get(auth , viewLikedProperties ) ;
likedPropertyRouter.route('/check/liked/:id').get(auth , checkIfLiked) ;
likedPropertyRouter.route('/delete/:id').delete( deleteLikedProperty) ;



export {likedPropertyRouter } ;
