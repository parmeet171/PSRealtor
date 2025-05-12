import React, { useState, useRef, useContext, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import { StandaloneSearchBox , LoadScript } from "@react-google-maps/api";
import Filters from "./Filters";
import cancel from "../assets/cancel.png";
import { propertyContext } from "../context/RealEstateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchPopUp = () => {
  const [searchAddress, setSearchAddress] = useState({
    premise: "",
    locality: "",
    sublocality: "",
    postalCode: "",
    houseNo : "" , 

  });
  let newSubLocality = "";
  const navigateTo = useNavigate(); 

  const {
    currentFilteringCondition , setCurrentFilteringCondition , 
    setSelectedBedrooms,
    setSelectedPostedBy,
    setSelectedPropertyType,
    setSelectedConstructionStatus,
    propertyFilterByCategory,
    propertyFilterByFor,
    filteredPropertyCategory,
    filteredPropertyFor,
    setFilteredPropertyCategory,
    setFilteredPropertyFor,
    setFilteredPropertyType,
    setFilteredConstructionStatus,
    setFilteredPostedBy,
    setFilteredFurnishingStatus,
    setFilteredBedrooms,
    setFilteredSharingCount,
    filteredPropertyType,
    setFilteredAvailableFor,
    showFilters,
    setShowFilters,
    isLoaded,
    properties,
    setProperties,
    filteredContructionStatus,
    filteredBedrooms,
    filteredSharingCount,
    filteredAvailableFor,
    filteredFurnishingStatus,
    setLoading,
    noSearchResults,
    setNoSearchResults,
    selectedBuyBudget  , selectedRentBudget  , selectedPgRentBudget  ,
  } = useContext(propertyContext);

  const inputRef = useRef();

  const handleOnPlacedChanged = () => {
    setSearchAddress({
      premise: "",
      locality: "",
      sublocality: "",
      postalCode: "",
    });
    let address = inputRef.current.getPlaces();
    console.log(address);
    console.log("lat  =  ", address[0]?.geometry?.location?.lat());
    const newCoordinates = {
      lat: address[0]?.geometry?.location?.lat(),
      lng: address[0]?.geometry?.location?.lng(),
    };
    address[0]?.address_components &&
      address[0]?.address_components?.forEach((item) => {
        item.types.some((sub_item) => {
          if (sub_item == "premise") {
            setSearchAddress((prev) => {
              return {
                ...prev,
                premise: item?.long_name,
              };
            });
          }
          if (sub_item == "locality") {
            setSearchAddress((prev) => {
              return {
                ...prev,
                locality: item?.long_name,
              };
            });
          } else if (sub_item === "sublocality") {
            newSubLocality = newSubLocality + " " + item?.long_name;
          } else if (sub_item == "postal_code") {
            setSearchAddress((prev) => {
              return {
                ...prev,
                postalCode: item?.long_name,
              };
            });
          }
        });
      });
    setSearchAddress((prev) => {
      return {
        ...prev,
        sublocality: newSubLocality.trim(),
      };
    });
  };

  useEffect(() => {
    // inputRef?.current?.focus() ;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(filteredPropertyCategory);
  }, [filteredPropertyCategory]);

  const onClickHandler = async (e) => {
    // setFilteredPropertyCategory('residential');
    // setFilteredPropertyFor('sell')  ;
    // setFilteredPropertyType([]) ;
    // setFilteredPostedBy([]) ;
    // setFilteredConstructionStatus([]);
    // setFilteredBedrooms('') ;
    // setFilteredFurnishingStatus('') ;
    // setFilteredAvailableFor('') ;
    // setFilteredSharingCount('') ;

    navigateTo('/properties'); 


    e.preventDefault();
    setLoading(true);
    

    if (searchAddress?.locality ===  "") {
      console.log(searchAddress) ;
      toast.error("Please provide a valid address");
      return;
    }
    let filteringCondition = `?propertyFor=${filteredPropertyFor}&propertyCategory=${filteredPropertyCategory}`;

    if (filteredPropertyType?.length > 0) {
      filteringCondition += `&propertyType=${filteredPropertyType}`;
    }
    // posted by

    if (filteredContructionStatus?.length > 0) {
      filteringCondition += `&availabilityStatus=${filteredContructionStatus}`;
    }
    if (filteredBedrooms !== "") {
      filteringCondition += `&bedrooms=${filteredBedrooms}`;
    }
    if (filteredSharingCount !== "") {
      filteringCondition += `&sharingPeopleCount=${filteredSharingCount}`;
    }
    if (filteredAvailableFor !== "") {
      filteringCondition += `&pgAvailableFor=${filteredAvailableFor}`;
    }
    if (filteredFurnishingStatus !== "") {
      filteringCondition += `&furnishing=${filteredFurnishingStatus}`;
    }
    if (searchAddress?.locality !== "") {
      filteringCondition += `&locality=${searchAddress?.locality}`;
    }
    if (searchAddress?.sublocality !== "") {
      filteringCondition += `&subLocality=${searchAddress?.sublocality}`;
    }
    if (searchAddress?.postalCode !== "") {
      filteringCondition += `&postalCode=${searchAddress?.postalCode}`;
    }
    if(searchAddress?.premise !== "") 
    {
      filteringCondition += `&premise=${searchAddress?.premise}`;
    }

    if(selectedBuyBudget !== 0 && filteredPropertyFor == "Sell" ) 
    {
      filteringCondition += `&price=${selectedBuyBudget}`;
    }
    if(selectedRentBudget !== 0 && filteredPropertyFor == "Rent" ) 
    {
      filteringCondition += `&rent=${selectedRentBudget}`;
    }
    if(selectedPgRentBudget !== 0 && filteredPropertyFor == "PG" ) 
    {
      filteringCondition += `&rent=${selectedPgRentBudget}`;
    }
    // house no 
    setCurrentFilteringCondition(filteringCondition) ;
    console.log(filteringCondition);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/property/${filteringCondition}`
      );

      console.log(response);
      if (response?.data?.data?.length == 0) {
        // empty response 
        setNoSearchResults(true) ;
        toast.error(
          "Sorry no search results for matching filter : Please try again "
        );
      }
      else{
        setNoSearchResults(false) ;
      }
      response?.data?.data.length > 0 && setProperties(response?.data?.data);
      setShowFilters(false);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      console.log(err.message);
    }

    setLoading(false);
  };
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}
      className="text-gray-200 z-10  absolute h-[100vh] w-[100%]  top-0 flex items-center justify-center "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
        className="w-1/2  rounded-xl  bg-white/100  flex flex-col gap-6 p-7 text-[#0e1c24]   shadow-3xl"
      >
        <img
          onClick={() => {
            // clear all filters ...
            // setFilteredPropertyCategory('residential');
            // setFilteredPropertyFor('sell')  ;
            // setFilteredPropertyType([]) ;
            // setFilteredPostedBy([]) ;
            // setFilteredConstructionStatus([]);
            // setFilteredBedrooms('') ;
            // setFilteredFurnishingStatus('') ;
            // setFilteredAvailableFor('') ;
            // setFilteredSharingCount('') ;
            setShowFilters(false);
          }}
          className="w-8 cursor-pointer "
          src={cancel}
        />
        <h1 className="text-4xl capitalize ">Explore real estate in..</h1>
        <div className="flex gap-10 text-xl">
          {propertyFilterByFor.map((preference, idx) => {
            return (
              !(idx == 2 && filteredPropertyCategory == "commercial") && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col gap-2 capitalize"
                >
                  <motion.label
                    className={`   cursor-pointer    ${
                      filteredPropertyFor == preference ? "text-[#396d8c] " : ""
                    }`}
                    htmlFor={preference}
                    key={idx}
                  >
                    {preference}
                  </motion.label>
                  {filteredPropertyFor == preference && (
                    <div className="h-[2px] w-full bg-[#396d8c] "></div>
                  )}
                  <input
                    onChange={(e) => {
                      setFilteredPropertyFor(e.target.value);
                      setFilteredPropertyType([]);
                    }}
                    className={`hidden `}
                    id={preference}
                    type="radio"
                    name="preference"
                    value={preference}
                  />
                </motion.div>
              )
            );
          })}
        </div>

        <div className="p-3 flex items-center justify-between gap-2 border-2 shadow-md ">
          {/* dropdown */}

          <div className="flex gap-2 items-center w-full ">
            <div>
              <select
                onChange={(e) => {
                  setFilteredPropertyCategory(e.target.value);
                }}
                value={filteredPropertyCategory}
                className="p-2 outline-none capitalize"
              >
                {propertyFilterByCategory.map((cateogry, index) => {
                  return <option value={cateogry}>{cateogry}</option>;
                })}
              </select>
            </div>
            <span className="">
              <CiSearch className="text-2xl text-[#001f3f]" />
            </span>
            <div className="w-full">
            {isLoaded && (
                <StandaloneSearchBox
                  onLoad={(ref) => {
                    inputRef.current = ref;
                  }}
                  onPlacesChanged={handleOnPlacedChanged}
                >
                  <input
                    className="  w-full p-2 outline-none bg-transparent text-xl"
                    type="text"
                    name="search"
                    placeholder="Search City"
                  />
                </StandaloneSearchBox>
              )}
            </div>
          </div>
          <motion.button
            onClick={onClickHandler}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#001f3f] px-6 py-3 items-center  rounded-xl text-[#ead8b1]"
          >
            Explore
          </motion.button>
        </div>

        <div className="flex gap-2">
          <h1 className="font-medium text-slate-900">Filters : </h1>
          <button
            onClick={() => {
              setFilteredPropertyCategory("residential");
              setFilteredPropertyFor("Sell");
              setFilteredPropertyType([]);
              setFilteredPostedBy([]);
              setFilteredConstructionStatus([]);
              setFilteredBedrooms("");
              setFilteredFurnishingStatus("");
              setFilteredAvailableFor("");
              setFilteredSharingCount("");
              setCurrentFilteringCondition("") ;
              navigateTo('/properties') ;

              
            }}
            className="text-[#699ab0]"
          >
            Clear All Filters
          </button>
        </div>
        <Filters />
      </motion.div>
    </motion.div>
  );
};

export default SearchPopUp;
