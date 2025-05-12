import React from "react";
import { MdOutlineCheck } from "react-icons/md";
import { motion } from "framer-motion";

const PropertyAmenities = ({ propertyData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="bg-[#396d8c] text-[#f4f5f7] p-8 rounded-xl flex flex-col gap-4 backdrop-blur-sm bg-slate-900/50 box-shadow2  "
    >
      {/* amenities */}
      <h1 className="capitalize text-2xl ">property amenities :</h1>
      <div className="flex flex-wrap gap-4 ">
        {propertyData?.amenities?.map((amenities, index) => {
          return (
            <button
              key={index}
              className="capitalize px-3 py-1 border-2 rounded-full flex items-center gap-3 "
            >
              <span>
                <MdOutlineCheck />
              </span>
              {amenities}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PropertyAmenities;
