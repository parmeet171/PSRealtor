import express from 'express' ;
import { getAllProperty, getAllUser, loginAdmin, registerAdmin , mostSearchedProperty, deleteUser, deleteProperty  , mostLikedProperty , viewActiveProperty , 
    viewSoldProperties ,  
    propertyPostedCountPerUser , 
    propertyOwners , 
    propertyBuilders , 
    propertyDealers } from '../controllers/admin.controller.js';
const adminRouter = express.Router() ; 
adminRouter.route('/register').post(registerAdmin) ;
adminRouter.route('/login').post(loginAdmin); 
adminRouter.route('/properties').get(getAllProperty) ;
adminRouter.route('/users').get(getAllUser) ;
adminRouter.route('/most/search/properties').get(mostSearchedProperty) ;
adminRouter.route('/property/:id').delete(deleteProperty) ;
adminRouter.route('/user/:id').delete(deleteUser) ;
adminRouter.route('/most/liked/properties').get(mostLikedProperty) ;
adminRouter.route('/active/properties').get(viewActiveProperty) ;
adminRouter.route('/sold/properties').get(viewSoldProperties) ;
adminRouter.route('/properties/posted/:id'  ).get(propertyPostedCountPerUser);
adminRouter.route('/get/owners' ).get(propertyOwners);
adminRouter.route('/get/dealers' ).get(propertyDealers);; 
adminRouter.route('/get/builders' ).get(propertyBuilders);; 

export {adminRouter} ;
