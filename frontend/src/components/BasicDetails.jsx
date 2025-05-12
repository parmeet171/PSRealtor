import React, { useState, useContext, useEffect } from "react";
import { propertyContext } from "../context/RealEstateContext";
import ContinueBtn from "./ContinueBtn";
import {motion , AnimatePresence} from 'framer-motion' ;
import { toast } from "react-toastify";
import Back from "./Back";

const BasicDetails = () => {
  const {
    propertyType,
    CommercialProperties,
    lookingTo,
    setSelectedLookingTo,
    selectedLookingTo,
    selectedPropertyCategory,
    setSelectedPropertyCategory,
    setSelectedPropertyType,
    selectedPropertyType , 
    selectedCommercialProperties , setSelectedCommercialProperties ,
    data  ,
    setData ,
    userName
  } = useContext(propertyContext);
  const handleFunctionOnContinue = async () => {
    if(selectedLookingTo == -1 || selectedPropertyCategory == -1 || (selectedPropertyType == -1 &&  selectedCommercialProperties == -1  ) ) 
    {
      toast.error('All fields are mandatory') ;
      return false ;
    }
    let newData ;
    if(selectedPropertyCategory == 0 ) 
    {
      newData = {
        propertyFor : lookingTo[selectedLookingTo] , 
        propertyCategory : 'residential' , 
        propertyType : propertyType[selectedPropertyType]  , 
    }
    }
    else{
      newData =  {
        propertyFor : lookingTo[selectedLookingTo] , 
        propertyCategory : 'commercial' , 
        commercialPropertyType : CommercialProperties[selectedCommercialProperties]  , 
    }
    }
    setData(newData )  ;
    return true ;
    
  }
  return (

      <motion.div initial = {{opacity : 0  , x : "300px"}} animate = {{opacity : 1, x : 0 } } exit = {{opacity : 0 , x : "300px"  }} transition = {{ duration : 1 ,  ease : 'easeInOut'  ,duration : .5 ,    }} className=" text-[#f4f5f7] box-shadow   p-10 flex flex-col gap-4 h-[70vh]  overflow-auto ">
        <Back/>
      <h1 className="text-3xl capitalize  leading-normal">
       {` Welcome ${userName}`} ! <br /> Fill out basic details
      </h1>
      <div className="flex flex-col gap-4">
        <p className="text-2xl">I'am looing to</p>
        <div className="flex gap-4 items-center ">
          {/* Sell , rent , pg  */}
          {lookingTo.map((item, index) => {
            return (
              <motion.button
               whileTap={{scale : .9}} whileHover={{scale : 1.1}}                
                onClick={() => {
                  
                  setSelectedLookingTo(index);
                  if(index  == 2 ) 
                  {
                    setSelectedPropertyCategory(0) ;
                  }
                 
                }}
                className={`${
                  selectedLookingTo !== index
                    ? "bg-[#f4f5f7] text-slate-900"
                    : "bg-[#396d8c] text-[#f4f5f7]"
                }   ${selectedPropertyCategory == 1 && index == 2  ? 'hidden' : 'block'}   px-3 py-1 rounded-full  `}
                key={index}
              >
                {item}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/*type of of property  */}
        <h2 className="text-2xl ">What kind of Property do you have ? </h2>
        <div>
          <div className="flex items-center gap-4">
            <motion.div whileTap={{scale : .9}} whileHover={{scale : 1.1}}     className="flex gap-2 items-center  ">
              <motion.label htmlFor="residential" className="text-xl">
                Residential
              </motion.label>
              <motion.input
                checked  = {selectedPropertyCategory == 0 ? true : false }
                id="residential"
                type="radio"
                name="property-category"
                value={0}
                onChange={(e) => {
                  setSelectedPropertyCategory(Number ( e.target.value ) );
                  
                }}
              />
            </motion.div>
            <motion.div whileTap={{scale : .9}} whileHover={{scale : 1.1}}         className="flex gap-2 items-center ">
              <motion.label
              
                htmlFor="commercial"
                className={`text-xl ${
                  selectedLookingTo == 2 ? "text-gray-400" : ""
                }`}
              >
                Commercial
              </motion.label>
              <motion.input
                checked  = {selectedPropertyCategory == 1 ? true : false }
                disabled={selectedLookingTo == 2 ? true : false}
                onChange={(e) => {
                  setSelectedPropertyCategory(Number ( e.target.value ) );
                  
                }}
                className="p-2"
                id="commercial"
                type="radio"
                name="property-category"
                
                value={1}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap mt-4 ">
        {selectedPropertyCategory == 0 && propertyType.map((type, index) => {
          return (
            <motion.button
            whileTap={{scale : .9}} whileHover={{scale : 1.1}}      
              onClick={() => {
                setSelectedPropertyType(index);
               


              }}
              className={` ${
                (selectedLookingTo == 2 && (index == 5 || index == 6)) ||
                (selectedLookingTo == 1 && index == 5)
                  ? "hidden"
                  : "block"
              } ${selectedPropertyType == index ? 'bg-[#396d8c] text-[#f4f5f7] ' : 'bg-[#f4f5f7] text-slate-900' }  px-3 py-1 rounded-full `}
              key={index}
            >
              {type}
            </motion.button>
          );
        })}
        {
          selectedPropertyCategory == 1 && CommercialProperties.map((type , index  ) => {
            return  <motion.button
            whileTap={{scale : .9}} whileHover={{scale : 1.1}}      
              onClick={() => {
                setSelectedCommercialProperties(index);
              }}
              className={`${selectedCommercialProperties == index ? 'bg-[#396d8c] text-[#f4f5f7] ' : 'bg-[#f4f5f7] text-slate-900' }  px-3 py-1 rounded-full `}
              key={index}
            >
              {type}
            </motion.button>

          }  )
        }
      </div>

      <ContinueBtn handlerFunc = {handleFunctionOnContinue} />
    </motion.div>
  );
};

export default BasicDetails;
