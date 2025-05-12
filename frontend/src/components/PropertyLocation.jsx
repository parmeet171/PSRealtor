import React, { useEffect, useContext, useState, useRef } from "react";
import ContinueBtn from "./ContinueBtn";
import Back from "./Back";
import { motion } from "framer-motion";
import { propertyContext } from "../context/RealEstateContext";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { toast } from "react-toastify";
const PropertyLocation = () => {
  const {
    isLoaded,
    setData,
    locality,
    setLocality,
    subLocality,
    setSublocality,
    postalCode,
    setPostalCode,
    premise,
    setPremise,
    houseNo,
    setHouseNo,
  } = useContext(propertyContext);

  const inputRef = useRef();

  let newSubLocality = "";
  const handleFunctionOnContinue = async () => {
    if (locality == "" || postalCode == "") {
      toast.error("Please enter a valid address");
      return false;
    }

    setData((prevData) => {
      return {
        ...prevData,
        premise,
        subLocality,
        locality,
        postalCode,
        houseNo,
      };
    });

    return true;
  };

  // useEffect(() => {
  //   console.log(locality);
  //   console.log(subLocality);
  //   console.log(postalCode);
  //   console.log(premise) ;

  // }, [locality, subLocality, postalCode ,premise ]);

  useEffect(() => {}, []);

  const handleOnPlacedChanged = () => {
    setLocality("");
    setSublocality("");
    setPremise("");
    setPostalCode("");

    let address = inputRef.current.getPlaces();
    console.log(inputRef.current);

    console.log("address => ", address[0].address_components);

    console.log("lat  =  ", address[0]?.geometry?.location?.lat());

    address[0]?.address_components &&
      address[0]?.address_components?.forEach((item) => {
        item.types.some((sub_item) => {
          if (sub_item == "premise") {
            setPremise(item?.long_name);
          }
          if (sub_item == "locality") {
            setLocality(item?.long_name);
          } else if (sub_item === "sublocality") {
            newSubLocality = newSubLocality + " " + item?.long_name;
          } else if (sub_item == "postal_code") {
            setPostalCode(item?.long_name);
          }
        });
      });
    setSublocality(newSubLocality.trim());
  };

  // locality  , sub locality ,  postal code ,  house no , apartment  , address

  return (
    <motion.div
      initial={{ opacity: 0, x: "300px" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "300px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="flex box-shadow overflow-y-auto flex-col p-10 gap-4 h-[70vh]"
    >
      <Back />
      <h1 className="text-3xl text-[#f4f5f7] ">
        Where is your property located ?{" "}
      </h1>
      <p className="text-[#f4f5f7] ">
        An accurate location helps you connect with right buyers
      </p>

      <div className="flex gap-4 flex-col self-start  w-full  text-[#f4f5f7]  ">
      {isLoaded && (
            <StandaloneSearchBox
              onLoad={(ref) => {
                inputRef.current = ref;
              }}
              onPlacesChanged={handleOnPlacedChanged}
            >
              <motion.input
                whileTap={{ scale: 1 }}
                whileHover={{ scale: 1.009 }}
                className="px-3 py-2 w-full  text-xl outline-none bg-transparent border-2  rounded-md  "
                type="text"
                placeholder="Address"
              />
            </StandaloneSearchBox>
          )}

        {locality !== "" && (
          <motion.input
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.009 }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
            type="text"
            placeholder="Locality"
            value={locality}
            readOnly
          />
        )}
        {subLocality && (
          <motion.input
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.009 }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
            type="text"
            placeholder="Sub Locality (optional) "
            value={subLocality}
            readOnly
          />
        )}
        {postalCode && (
          <motion.input
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.009 }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
            type="text"
            placeholder="postal code (optional)"
            readOnly
            value={postalCode}
          />
        )}
        {premise !== "" && (
          <motion.input
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.009 }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md   "
            type="text"
            placeholder="Apartment/Society (optional) "
            value={premise}
          />
        )}
        <motion.input
          whileTap={{ scale: 1 }}
          whileHover={{ scale: 1.009 }}
          className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
          type="text"
          placeholder="House no (optional)"
          value={houseNo}
          onChange={(e) => {
            setHouseNo(e.target.value);
          }}
        />
      </div>

      <ContinueBtn handlerFunc={handleFunctionOnContinue} />
    </motion.div>
  );
};

export default PropertyLocation;
