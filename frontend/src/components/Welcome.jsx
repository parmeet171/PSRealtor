import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { propertyContext } from "../context/RealEstateContext";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { setSearchProperty, showFilters, setShowFilters } =
    useContext(propertyContext);

  const navigate = useNavigate();

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <motion.div className="text-gray-200 z-9  absolute h-[100%]  top-0 flex items-center justify-center ">
      <motion.div className="w-1/2 flex flex-col gap-4">
        <motion.h1
          initial={{ opacity: 0, x: "-300px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          className="text-5xl text-center   "
        >
          <i className="font-medium uppercase font-serif] shadow-xl leading-normal">
            welcome to
          </i>{" "}
          <br />{" "}
          <span className="uppercase font-extrabold tracking-widest shadow-xl text-[#EAD8B1] ">
            ps realtors{" "}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: "-300px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          className="text-xl text-center text-gray-300  leading-normal"
        >
          <span className="capitalize text-[1.5rem] ">
            "where finding your dream home is made easy!"
          </span>
          <br />
          <span className="text-[1rem]">
            Whether you are buying, selling, or investing, we are dedicated to
            providing personalized services that meet your unique needs. Explore
            our extensive listings of residential, commercial, and luxury
            properties, and discover the perfect space to call your own.
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: "-300px" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
          className="self-center"
        >
          {/* <motion.button onClick={() => {setShowFilters(true )} } whileHover = {{scale : 1.1}} whileTap = {{scale : .9}} className="text-md  capitalize mt-4 hover:scale-150  self-center p-3 rounded-full flex items-center gap-2 bg-[#f4f5f7] text-slate-900  "> */}
          <motion.button
            onClick={() => navigate('/properties')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-md  capitalize mt-4 hover:scale-150  self-center p-3 rounded-full flex items-center gap-2 bg-[#f4f5f7] text-slate-900  "
          >
            <span className="text-xl text-[#001F3F] ">
              <CiSearch />
            </span>
            Search Property
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
