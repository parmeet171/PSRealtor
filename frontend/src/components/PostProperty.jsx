import React from "react";
import free from "../assets/free.png";
import sideImage from '../assets/sideImagePostProperty.jpg' ;
import {motion} from 'framer-motion' ; 
import { useNavigate } from "react-router-dom";
const PostProperty = () => {
  const navigateTo = useNavigate() ; 

  return (
    <div className="h-[100%] bg-slate-900 flex items-center justify-center ">
      <motion.div className="w-[70%] rounded-xl  overflow-hidden  flex  gap-4 text-[#f4f5f7]">
        <motion.div  initial = {{opacity : 0  ,  scale : 1.2 , x : "-300px"} } whileInView={{opacity : 1  , scale : 1 , x : 0 }} transition={{duration : 1 , ease : 'easeInOut' , type : 'spring', stiffness : 100 }}  className="flex-1   flex flex-col gap-8  p-8 ">
          {/* text */}

          <p className="text-sm text-gray-300 tracking-wider">
            SELL OR RENT YOUR PROPERTY
          </p>
          <h1 className="text-4xl font-medium tracking-wider ">
            Register to post your property for{" "}
            <span>
              <img className="w-16" src={free} />
            </span>
          </h1>
          <p className="text-[1rem] text-gray-300">
            Post your residential / commercial property
          </p>

          <div className="flex gap-8  items-center justify-around  ">
            <div className="text-[#f4f5f7] flex flex-col gap-1 ">
              <h1 className="text-3xl font-extrabold">10L+</h1>
              <p className="text-[1rem]">Property Listings</p>
            </div>
            <div className="text-[#f4f5f7] ">
              <h1 className="text-3xl font-extrabold">45L+</h1>
              <p className="text-[1rem]">Monthly Searches</p>
            </div>
            <div className="text-[#f4f5f7] ">
              <h1 className="text-3xl font-extrabold">2L+</h1>
              <p className="text-[1rem]">Owners advertise monthly</p>
            </div>
          </div>

          <motion.button onClick={() => {navigateTo('/post-property')}} whileHover = {{scale : 1.1 }} whileTap = {{scale  : .9 }} className="bg-[#396d8c] self-start p-4 rounded-xl ">
            POST YOUR PROPERTY
          </motion.button>
        </motion.div>

        <motion.div  initial = {{opacity : 0  , x : "300px"} } whileInView={{opacity : 1  , x : 0 }} transition={{duration : 1 , ease : 'easeInOut' , type : 'spring', stiffness : 100 }}  className="flex-1  ">
            <img className="w-[100%] h-[100%] object-cover" src = {sideImage} />

        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostProperty;
