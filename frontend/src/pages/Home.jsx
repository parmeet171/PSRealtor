import React, { useContext , useEffect } from "react";
import Background from "../assets/background.jpg";
import { motion } from "framer-motion";
import Welcome from "../components/Welcome";
import { AnimatePresence } from "framer-motion";
import Auth from "../components/Auth";
import { propertyContext } from "../context/RealEstateContext";
import SearchPopUp from "../components/SearchPopUp";
import PropertyFilters from "../components/PropertyFilters";
import CommercialSpace from "../components/CommercialSpace";
import ExploreCities from "../components/ExploreCities";
import PostProperty from "../components/PostProperty";
import ChatBot from "../components/ChatBot";
import {toast } from 'react-toastify' ;
import BrowseByBudget from "../components/BrowseByBudget";

const Home = () => {
  const { authPage,   showFilters ,socket  , setPropertiesRoute } =
    useContext(propertyContext);
    useEffect(()=> {
      setPropertiesRoute(false)  ;
    } , [] )

  return (
    <>
      {/*  main page  */}
      <div className="min-h-[100vh] relative">
        <AnimatePresence>{authPage && <Auth key="modal" />}</AnimatePresence>
        <div className="absolute h-[100%] w-[100%] opacity-70 z-2 bg-black"></div>
        <motion.div
          className="h-screen object-cover bg-center  bg-no-repeat p-6  content-center overflow-hidden  "
          style={{ backgroundImage: `url(${Background})` }}
        >
          {/* text */}
        </motion.div>
        {
          !showFilters && <Welcome/>
        }
        <AnimatePresence>
          {
            showFilters && <SearchPopUp key = "modal"/>
          }
        </AnimatePresence>

        
        
        {/* <SearchPopUp /> */}
      </div>

      {/* chat bot  */}
      
      <div className="h-screen mt-100">
        {/* Invest  in Commercial space */}
        <CommercialSpace/>
      </div>
      <div className="h-screen  mt-100">
        <PropertyFilters/>
      </div>
      <div className="h-screen mt-100">
        <ExploreCities/>
      </div>
      <div className="h-screen mt-100">
       <PostProperty/>
      </div>

      
      <div>{/* featured dealers */}</div>

      <div>{/* builders working with */}</div>

      <div>{/* bhk choice in mind  */}</div>

      <div>{/* type of advertiser builder dealer owner  */}</div>

      <div>{/* flat move in now , ready or later  */}</div>

      <div>{/* browse by budget */}</div>

      <div>{/* articles  */}</div>
      <div>{/* post property */}</div>

      <div>{/*  */}</div>

      <div>{/* our services  */}</div>

      <div>
        {/* explore real estate in popular cities
         */}
      </div>

      <div>{/* review your property */}</div>
    </>
  );
};

export default Home;
