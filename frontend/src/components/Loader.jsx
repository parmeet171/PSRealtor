import React, { useContext, useState } from "react";
import { easeOut, motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { propertyContext } from "../context/RealEstateContext";
const Loader = () => {
    
  return (
    <div className="absolute h-full w-full bg-black top-0 left-0 z-10 opacity-70  text-white flex items-center justify-center ">
      <motion.div
      className=""
        animate={{ rotate: [0  ,  90  , 180  , 360] }}
        transition={{ repeat: Infinity , ease : easeOut  }}
      >
        <AiOutlineLoading3Quarters className="text-5xl" />
      </motion.div>
    </div>
  );
};

export default Loader;
