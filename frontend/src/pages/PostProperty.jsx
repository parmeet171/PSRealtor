import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence  ,  motion } from "framer-motion";
import { IoCheckmarkOutline } from "react-icons/io5";
import BasicDetails from "../components/BasicDetails";
import PropertyLocation from "../components/PropertyLocation";
import AboutProperty from "../components/AboutProperty";
import UploadPhoto from "../components/UploadPhoto";
import PricingDetails from "../components/PricingDetails";
import { propertyContext } from "../context/RealEstateContext";
import AmenitiesSection from "../components/AmenitiesSection";
import PropertyUploaded from "../components/PropertyUploaded";
import UpdateDetails from "../components/UpdateDetails";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify' ;

const PostProperty = () => {
  const { stepperState, setStepperState, stepperCount, setStepperCount  ,setPropertiesRoute , userName , setAuthPage  } =
    useContext(propertyContext);

  let height = 100 - (100 - (stepperCount - 1) * 20);
  const navigateTo = useNavigate('/') ;

  useEffect(() => {
    setPropertiesRoute(false)  ;
    const token = localStorage.getItem('accessToken') ;
    if(!token) 
    {
      toast.error('Please login or register first to post a property')  ;
      navigateTo('/'); 
      setAuthPage(true) ;
    }
  } , [] ) ;


  return (
    <div className="bg-[#001f3f] h-screen flex items-center justify-center ">
      <div className="w-[80%]   mx-auto flex items-center justify-center    ">
        <div className="text-gray-200 w-[20%]   ">
          {/* stepper */}

          <div className="flex flex-col  w-[100%]  ">
            <div className="flex z-10 w-[100%] relative flex-col justify-between h-[70vh] self-start  overflow-hidden ">
              {stepperState.map((stepper, index) => {
                // count > (index + 1)
                // count == (index + 1 )

                return (
                  <>
                    <div className="z-10 flex gap-4 items-center  ">
                      <button
                        key = {index}
                        className={`w-10 h-10 flex items-center justify-center transition-all ease-in-out duration-75   z-10  rounded-full  bg-gray-200 text-slate-900 ${
                          stepperCount > index + 1 ? "bg-green-500" : ""
                        }     `}
                      >
                        {stepperCount > index + 1 ? (
                          <IoCheckmarkOutline />
                        ) : (
                          index + 1
                        )}{" "}
                      </button>
                      <div className="capitalize flex flex-col ">
                        <span>{stepper}</span>{" "}
                        <span>{`step ${index + 1}`}</span>{" "}
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="absolute transition-all ease-in-out duration-75 z-5 w-[.1rem] h-[100%] top-0 left-[1.1rem] bg-gray-200">
                {/* progress bar */}
              </div>
              <div
                style={{ height: `${height}%` }}
                className="absolute transition-all ease-in-out duration-75 h-[100%] z-5 w-[.2rem]  top-0 left-[1.1rem] bg-[#396d8c] "
              >
                {/* progress bar */}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%] ">
          {/* multiple component  */}
          {(() => {
            switch (stepperCount) {
              case 1:
                return <AnimatePresence>
                  <UpdateDetails key = "modal" />
                </AnimatePresence>
              case 2:
                return <AnimatePresence>
                  <BasicDetails key = "modal" />
                </AnimatePresence>

              case 3:
                return  <AnimatePresence>
                <PropertyLocation key = "modal" />
              </AnimatePresence>
               

              case 4:
                return <AnimatePresence>
                  <AboutProperty key = "modal"/>;
                </AnimatePresence>

              case 5:
                return <AnimatePresence>
                  <UploadPhoto key = "modal" />
                </AnimatePresence>

              case 6:
                return <AnimatePresence>
                  <PricingDetails key = "modal" />
                </AnimatePresence>

              case 7:
                return <AnimatePresence>
                  <AmenitiesSection key = "modal"/>
                </AnimatePresence>
              default:
                // response after creating the property
                return <PropertyUploaded/>  ;
                
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default PostProperty;
