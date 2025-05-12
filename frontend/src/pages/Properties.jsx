import React, { useContext, useEffect, useState } from "react";
import { propertyContext } from "../context/RealEstateContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchPopUp from "../components/SearchPopUp.jsx";
import SellCard from "../components/SellCard.jsx";
import RentCard from "../components/RentCard.jsx";
import PgCard from "../components/PgCard.jsx";
import { IoFilter } from "react-icons/io5";
import axios from "axios";
import error from "../assets/error.png";

const Properties = () => {
  const {
    propertiesRoute,
    setPropertiesRoute,
    propertyFilterByFor,
    filteredPropertyFor,
    filteredPropertyCategory,
    setFilteredPropertyFor,
    setFilteredPropertyType,
    setFilteredPropertyCategory,
    propertyFilterByCategory,
    searchProperty,
    showFilters,
    setShowFilters,
    properties,
    setProperties,
    filteredPropertyType,
    noSearchResults,
    setNoSearchResults,
    currentFilteringCondition,
    setCurrentFilteringCondition,
  } = useContext(propertyContext);
  useEffect(() => {
    setPropertiesRoute(true);

    (async () => {
      try {
        if (currentFilteringCondition == "") {
          const response = await axios.get(
            "http://localhost:8000/api/v1/property/"
          );
          console.log(response);
          setProperties(response?.data?.data);
        } else {
          const response = await axios.get(
            `http://localhost:8000/api/v1/property/${currentFilteringCondition}`
          );
          console.log(response);
          setProperties(response?.data?.data);
        }
      } catch (err) {
        console.log(err?.message);
        console.log(err);
      }
    })();
  }, [currentFilteringCondition]);

  return (
    <div className="bg-[#001f3f]  p-4 text-[#f4f5f7]">
      {/* <div className='w-full  min-h-[100vh] mt-[80px] bg-[#001f3f] '> */}
      <div className="w-full mt-[80px] bg-[#001f3f] ">
        <AnimatePresence>
          {showFilters && <SearchPopUp key="modal" />}
        </AnimatePresence>
        {/* listings */}
        {/* no search results  */}
        {noSearchResults && (
          <div className="  my-10 flex gap-2 items-center justify-center  w-full   ">
            <img className="w-56 " src={error} />
            <h1 className="text-center text-2xl    capitalize ">
              Sorry no search results for matching filter ! <br /> Please try
              again{" "}
            </h1>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.1, background: "#fff", color: "black" }}
          className="fixed rounded-xl mr-4"
          onClick={() => {
            setShowFilters(true);
          }}
        >
          <button className="text-xl font-medium tracking-wider flex items-center gap-2 px-3 py-2 border-2 rounded-xl">
            Filter{" "}
            <span>
              <IoFilter />
            </span>
          </button>
        </motion.div>
      </div>
      <div className="flex flex-col gap-10  mt-[150px]">
        {properties &&
          properties.map((property, index) => {
            if (property?.propertyFor === "Sell") {
              return <SellCard key={property?._id} property={property} />;
            } else if (property?.propertyFor === "Rent") {
              return <RentCard key={property?._id} property={property} />;
            } else if (property?.propertyFor === "PG") {
              return <PgCard key={property?._id} property={property} />;
            }
          })}
      </div>
    </div>
  );
};

export default Properties;
