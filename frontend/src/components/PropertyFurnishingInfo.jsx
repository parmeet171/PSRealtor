import React, { useContext , useState } from "react";
import { motion } from "framer-motion";
import { propertyContext } from "../context/RealEstateContext";
import { MdOutlineCheck } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa6"
import { PiFanFill } from "react-icons/pi";
import ac from '../assets/air.png' ;
import geyser from '../assets/geyser.png' ;

import wardrobe from '../assets/wardrobe.png' ;
const PropertyFurnishingInfo = ({furnishingDetails , otherFurnishingDetails}) => {
  const {propertyData} = useContext(propertyContext) ;
  var key = 0 ;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="bg-[#396d8c] text-[#f4f5f7] p-8 rounded-xl flex flex-col gap-4 backdrop-blur-sm bg-slate-900/50 box-shadow2  "
    >
        <h1 className="capitalize text-2xl ">property Furnishing Info :</h1>
        <div className="flex flex-wrap gap-10 ">
          {/*  */}
          {propertyData?.furnishingDetails.map((item) => {
            if(item?.light)
            {
              return <p className="capitalize text-xl flex items-center gap-2  "><span><FaRegLightbulb/></span>{`Lights : ${item?.light}`}</p>
            }
            else if(item?.Fans) {
              return <p className="capitalize text-xl flex items-center gap-2  "><span><PiFanFill/></span>{`Fans : ${item?.Fans}`}</p>

            }
            else if(item?.AC) 
            {
              return <p className="capitalize text-xl flex items-center gap-2 "><img className="w-8" src = {ac} />{`AC : ${item?.AC}`}</p>
            }
            else if(item?.wardrobe)
            {
              return <p className="capitalize text-xl flex items-center gap-2 "><img className="w-8" src = {wardrobe} />{`Wardrobe : ${item?.wardrobe}`}</p>
            }
            else if(item?.geyser)
            {
              return <p className="capitalize text-xl flex items-center gap-2"><img className="w-8"
               src ={geyser} />{`geyser : ${item?.geyser}`}</p>
            }
            
          })}


          
       
      </div>
      <div className="flex flex-wrap gap-4 ">
        {propertyData?.otherFurnishingDetails && propertyData?.otherFurnishingDetails?.map((details, index) => {
          return (
            <button
              key={index}
              className="capitalize px-3 py-1 border-2 rounded-full flex items-center gap-3 "
            >
              <span>
                <MdOutlineCheck />
              </span>
              {details}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PropertyFurnishingInfo;
