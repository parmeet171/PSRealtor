import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import axios from "axios";

import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
const propertyContext = createContext(null);
const RealEstateContext = (props) => {
  const [socket, setSocket] = useState(null);
  const [welcomeChatComp, setWelcomeChatComp] = useState(true);
  const [contactOwnerComp, setContactOwnerComp] = useState(false);

  const libraries = ["places"];
  const [photo, setPhoto] = useState("");

  const [noSearchResults, setNoSearchResults] = useState(false);

  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: "AIzaSyC-akEajAp53rZD21LdgEfm7sUJ_jlDLs8",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [pricepersqft, serPricePerSqFt] = useState("");

  const [currentFilteringCondition, setCurrentFilteringCondition] =
    useState("");
  const [properties, setProperties] = useState([]);
  const [changePasswordComp, setChangePasswordComp] = useState(false);
  const [modifyProfileComp, setModifyProfileComp] = useState(false);
  const [authPage, setAuthPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [images, setImages] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [searchProperty, setSearchProperty] = useState(false);
  const [token, setToken] = useState(false);
  const [userName, setUserName] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [contactInfo, showContactInfo] = useState(false);
  // filters
  const [propertyType, setPropertyType] = useState([
    "Flat/Apartment",
    "Independent/Builder Floor",
    "Independent House/Villa",
    "1RK /Studio Apartment",
    "Serviced Apartments",
    "Plot/Land",
    "Farm House",
  ]);

  const [CommercialProperties, setCommercialProperties] = useState([
    "Plot/Land",
  ]);
  const [budget, setBudget] = useState(100);
  const [constructionStatus, setContructionStatus] = useState([
    "New Launch",
    "Under Contruction",
    "ready to move",
  ]);
  const [postedBy, setPostedBy] = useState(["Owner", "Builder", "Dealer"]);
  const [bedroom, setBedroom] = useState(["1", "2", "3", "4", "4>"]);

  const [selectedBedrooms, setSelectedBedrooms] = useState(1);
  const [selectedBathrooms, setSelectedBathRooms] = useState(1);
  const [selectedBalconies, setSelectedBalconies] = useState(0);
  const [selectedAreaDetails, setSelectedAreaDetails] = useState([{}]);
  const [otherRooms, setOtherRooms] = useState([
    "pooja room",
    "study room",
    "servant room",
    "store room",
  ]);
  const [availabilityStatus, setAvailabilityStatus] = useState([
    "Ready to Move",
    "Under Contruction",
  ]);
  const [ageOfProperty, setAgeOfProperty] = useState([
    "0-1",
    "1-5",
    "5-10",
    "10+",
  ]);
  const [bedrooms, setBedrooms] = useState([1, 2, 3, 4]);
  const [bathrooms, setBathRooms] = useState([1, 2, 3, 4]);
  const [balconies, setBalconies] = useState([0, 1, 2, 3]);

  const [carpetArea, setCarpetArea] = useState("");
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");

  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(-1);
  const [selectedContructionStatus, setSelectedConstructionStatus] = useState(
    []
  );

  const [lookingTo, setLookingTo] = useState(["Sell", "Rent", "PG"]);
  const [stepperState, setStepperState] = useState([
    "Update Details",
    "Basic Details",
    "Location Details",
    "Property Profile",
    "Videos & Photos",
    "Pricing & Others",
    "Amenities Section",
  ]);

  // furnishing information
  const [furnishingStatus, setFurnishingStatus] = useState([
    "Furnished",
    "Semi-Furnished",
    "Un-furnished",
  ]);

  const [furnishingDetails, setFurnishingDetails] = useState([
    "washing machine",
    "sofa",
    "fridge",
    "water purifier",
    "microwave",
    "modular kitchen",
    "chimney",
    "dinning table",
    "curtains",
    "exhaust fan",
  ]);
  const [light, setLight] = useState(0);
  const [Fans, setFans] = useState(0);
  const [AC, setAC] = useState(0);
  const [wardrobe, setWardrobe] = useState(0);
  const [geyser, setGeyser] = useState(0);

  const [selectedTotalFloors, setSelectedTotalFloor] = useState("");
  const [selectedFloorNumber, setSelectedFloorNumber] = useState("");
  const [selectedPropertyAge, setSelectedPropertyAge] = useState(-1);
  const [selectedPossessionIn, setSelectedPossessionIn] = useState(-1);

  const [specifyBedrooms, setSpecifyBedrooms] = useState(false);
  const [specifyBathrooms, setSpecifyBathrooms] = useState(false);

  const [selectedFurnishingStatus, setSelectedFurnishingStatus] = useState(-1);
  const [selectedFurnishingDetails, setSelectedFurnishingDetails] = useState(
    []
  );
  const [locality, setLocality] = useState("");
  const [subLocality, setSublocality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [premise, setPremise] = useState("");
  const [houseNo, setHouseNo] = useState("");

  const [locationAdvantages, setLocationAdvantages] = useState([
    "Close to metro Station",
    "Close to school",
    "Close to hospital",
    "CLose to market",
    "Close to railway station",
    "Close to airport",
    "Close to mall",
    "Close to highway",
  ]);
  const [propertyFacing, setPropertyFacing] = useState([
    "North",
    "South",
    "East",
    "West",
    "Nort-East",
    "Nort-West",
    "South-East",
    "South-West",
  ]);
  const [otherFeatures, setOtherFeatures] = useState([
    "Gated Society",
    "Corner property",
  ]);
  const [flooringType, setFlooringType] = useState([
    "vinyl",
    "wood",
    "spartex",
    "vitrified",
  ]);
  const [amenities, setAmenities] = useState([
    "lift",
    "park",
    "visitor parking",
    "intercom facility",
    "water storage",
  ]);
  const [PropertyFeatures, setPropertyFeatures] = useState([
    "High Ceiling Height",
    "False Ceiling Lighting",
    "Piped Gas",
    "Internet wifi",
    "centerally air conditioned",
    "water purifier",
    "natural light",
    "airy rooms",
    "spacious interiors",
  ]);

  const [stepperCount, setStepperCount] = useState(1);
  const [selectedLookingTo, setSelectedLookingTo] = useState(-1); //sell , lease , pg
  const [selectedPropertyCategory, setSelectedPropertyCategory] = useState(0); // 0->commercial , 1->residential
  const [selectedCommercialProperties, setSelectedCommercialProperties] =
    useState(-1);
  const [isFurnished, setIsFurnished] = useState(false);
  const [possesionIn, setPossessionIn] = useState([
    "within 3 Months",
    "within  6 months",
    "by 2025",
    "by 2026",
    "by 2027",
    "by 2028",
    "by 2029",
    "by 2030",
  ]);

  const [selectedAvailabilityStatus, setSelectedAvailabiltyStatus] =
    useState(-1);
  const [selectedOtherRooms, setSelectedOtherRooms] = useState([]);

  const [propertyOnFloor, setPropertyOnFloor] = useState([
    "Basement",
    "Ground",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ]);

  const [coveredParkingSpace, setCoveredParkingSpace] = useState(0);
  const [openParkingSpace, setOpenParkingSpace] = useState(0);

  const [rentOutTo, setRentOutTo] = useState([
    "family",
    "Single men",
    "Single Women",
  ]);
  const [rentPrice, setRentPrice] = useState();
  const [rentInfoPrice, setRentInfoPrice] = useState([
    "Electricity & water charges excluded",
    "price negotiable",
  ]);

  const [durationOfAgreement, setDurationOfAgreement] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]);
  const [noticeMonths, setNoticeMonths] = useState([
    "None",
    "1 month",
    "2 month",
    "3 month",
    "4 month",
    "5 month",
    "6 month",
  ]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isFoodAvailable, setIsFoodAvailable] = useState(false);
  const [houseRules, setHouseRules] = useState("");

  const [selectedRentPrice, setSelectedRentPrice] = useState("");
  const [selectedRentInfoPrice, setSelectedRentInfoPrice] = useState("");
  const [selectedDurationOfAgreement, setSelectedDurationOfAgreement] =
    useState("");
  const [selectedNoticeMonths, setSelectedNoticeMonths] = useState("");
  const [selectedSecurityDeposit, setSelectedSecurityDeposit] = useState("");

  // selected rent info
  const [selectedRentOutTo, setSelectedRentOutTo] = useState("");
  const [selectedAvailableFrom, setSelectedAvailableFrom] = useState("");
  const [pgRoomType, SetPgRoomType] = useState(["sharing", "private"]);
  const [sharingPeopleCount, setSharingPeopleCount] = useState([
    "1",
    "2",
    "3",
    "4",
    "4+",
  ]);
  const [pgRoomInfo, setPgRoomInfo] = useState([
    "Attached BathRoom",
    "Attached Balcony",
  ]);

  const [pgAvailableFor, setPgAvailableFor] = useState([
    "girls",
    "boys",
    "any",
  ]);

  const [foodDetails, setFoodDetails] = useState([
    "Available",
    "Not available",
  ]);
  const [mealType, setMealType] = useState(["veg", "non-veg"]);
  const [availableMealsTiming, setAvailableMealsTiming] = useState([
    "breakfast",
    "lunch",
    "dinner",
  ]);
  const [chargesForFood, setChargesForFood] = useState([
    "included in rent",
    "Fixed amount",
  ]);

  // plot
  const [plotboundaryWall, setPlotBoundaryWall] = useState(["yes", "no"]);
  const [plotopenSides, setPlotOpenSides] = useState(["1", "2", "3", "3+"]);
  const [plotContruction, setPlotContruction] = useState(["yes", "no"]);

  const [selectedAllowedFloors, setSelectedAllowedFloor] = useState("");
  const [selectedNoOfOpenSides, setSelectedNoOfOpenSides] = useState(-1);
  const [selectedConstructionDone, setSelectedContructionDone] = useState("");
  const [selectedPlotArea, setSelectedPlotArea] = useState("");
  const [selectedBoundaryWall, setSelectedBoundaryWall] = useState("");

  const [selectedpropertyFeatures, setSelectedPropertyFeatures] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedLocationAdvantages, setSelectedLocationAdvantages] = useState(
    []
  );
  const [propertyData, setPropertyData] = useState("");

  const [selectedPropertyFacing, setSelectedPropertyFacing] = useState("");
  const [selectedOtherFeatures, setSelectedOtherFeatures] = useState([]);
  const [selectedFlooringType, setSelectedFlooringType] = useState("");

  //rent info

  const [selectedPgRoomType, setSelectedPgRoomType] = useState("");
  const [selectedSharingPeopleCount, setSelectedSharingPeopleCount] =
    useState("");
  const [selectedPgRoomInfo, setSelectedPgRoomInfo] = useState([]);
  const [selectedPgAvailableFor, setSelectedPgAvailableFor] = useState("");
  const [selectedPgFoodDetails, setSelectedPgFoodDetails] = useState(-1);
  const [selectedPgMealType, setSelectedPgMealType] = useState([]);
  const [selectedAvailableMealsTiming, setSelectedAvailableMealsTiming] =
    useState([]);
  const [selectedChargesForFood, setSelectedChargesForFood] = useState("");

  const [propertiesRoute, setPropertiesRoute] = useState(true);

  const [data, setData] = useState({});
  useEffect(() => {
    console.log("data = ", data);
  }, [data]);

  // FILTERS
  const [propertyFilterByCategory, setPropertyFilterByCategory] = useState([
    "residential",
    "commercial",
  ]);

  const [propertyFilterByFor, setPropertyFilterByFor] = useState([
    "Sell",
    "Rent",
    "PG",
  ]);

  // filters

  const [filteredPropertyCategory, setFilteredPropertyCategory] =
    useState("residential");
  const [filteredPropertyFor, setFilteredPropertyFor] = useState("Sell");
  const [filteredPropertyType, setFilteredPropertyType] = useState([]);
  const [filteredPostedBy, setFilteredPostedBy] = useState([]);
  const [filteredContructionStatus, setFilteredConstructionStatus] = useState(
    []
  );
  const [filteredBedrooms, setFilteredBedrooms] = useState("");
  const [filteredFurnishingStatus, setFilteredFurnishingStatus] = useState("");
  const [filteredAvailableFor, setFilteredAvailableFor] = useState("");
  const [filteredSharingCount, setFilteredSharingCount] = useState("");

  const [selectedPgInfo, setSelectedPgInfo] = useState([]);
  const [pgSuitableFor, setPgSuitableFor] = useState([
    "Students",
    "Working Professional",
  ]);
  const [selectedPgSuitableFor, setSelectedPgSuitableFor] = useState("");
  const [selectedPgCapacity, setSelectedPgCapacity] = useState("");

  const [userID, setUserID] = useState("");
  const [converstation, setConversation] = useState([
    { message: "Property looking for ? ", item: lookingTo },
    "",
    { message: "Type of property", item: propertyType },
  ]);
  useEffect(() => {
    console.log("sockettttt => ", socket);
  }, [socket]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    const tkn = localStorage.getItem("accessToken");
    if (tkn) {
      const config = {
        headers: {
          Authorization: "Bearer " + tkn,
        },
      };
      (async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/user/get/user",
            config
          );
          console.log("response = ", response);
          newSocket.emit("setup", response?.data?.data);
          setSocket(newSocket);
        } catch (err) {
          toast.error(
            "Something went wrong while setting up socket connection"
          );
          console.log(err);
        }
      })();
    } else {
    }

    return () => {
      newSocket.disconnect();
      // disconnect socket
      // remove listeners
    };
  }, []);

  useEffect(() => {
    // create listeners

    return () => {
      //remove listeners
    };
  });
  const [chattingAreaComp, setChattingAreaComp] = useState(false);
  const [currentChatWith, setCurrentChatWith] = useState({});
  const [reRenderChattingArea, setReRenderChattingArea] = useState(false);
  const [reRenderSideBar, setReRenderSidebar] = useState(false);
  const [chatAreaComp, setChatAreaComp] = useState(false);

  const [selectedBuyBudget , setSelectedBuyBudget] = useState(0) ;
  const [selectedRentBudget , setSelectedRentBudget] = useState(0) ; 
  const [selectedPgRentBudget , setSelectedPgRentBudget] = useState(0) ;


  
  

  // validations

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  };
  const validateNumber = (value) => {
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(value);
  };
  const validateString = (value) => {
    const stringRegex = /^[A-Za-z]+$/;
    return stringRegex.test(value);
  };
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };


    // // socket listeners

    // useEffect(() => {
    //   socket?.on("notifcation", () => {
    //     if(!chattingAreaComp && !chatAreaComp ) 
    //     {

    //       toast.success(chattingAreaComp , chatAreaComp) ;
    //       toast.info("New Notifcation") ;

    //     }
    //   });
  
    //   return () => {
    //     socket?.off("notification");
    //   };
    // });

    
  const value = {

    validatePassword,
    validateNumber,
    validateString,
    validateEmail,
    chatAreaComp, setChatAreaComp,
    socket,
    setSocket,
    chattingAreaComp,
    setChattingAreaComp,
    currentChatWith,
    setCurrentChatWith,
    reRenderChattingArea,
    setReRenderChattingArea,
    reRenderSideBar,
    setReRenderSidebar,
    welcomeChatComp,
    setWelcomeChatComp,
    converstation,
    setConversation,
    pricepersqft,
    serPricePerSqFt,
    currentFilteringCondition,
    setCurrentFilteringCondition,
    userID,
    setUserID,
    contactOwnerComp,
    setContactOwnerComp,
    propertyData,
    setPropertyData,
    modifyProfileComp,
    setModifyProfileComp,
    photo,
    setPhoto,
    noSearchResults,
    setNoSearchResults,
    isLoaded,
    setAuthPage,
    userName,
    images,
    setImages,
    setUserName,
    setIsLoginPage,
    isLoginPage,
    authPage,
    scrolling,
    setScrolling,
    token,
    setToken,
    searchProperty,
    setSearchProperty,
    propertyType,
    budget,
    constructionStatus,
    postedBy,
    bedroom,
    otherRooms,
    setOtherRooms,
    availabilityStatus,
    setAvailabilityStatus,
    ageOfProperty,
    setAgeOfProperty,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathRooms,
    balconies,
    setBalconies,
    selectedTotalFloors,
    setSelectedTotalFloor,
    selectedFloorNumber,
    setSelectedFloorNumber,
    selectedPropertyAge,
    setSelectedPropertyAge,
    selectedPossessionIn,
    setSelectedPossessionIn,
    specifyBedrooms,
    setSpecifyBedrooms,
    specifyBathrooms,
    setSpecifyBathrooms,
    selectedFurnishingStatus,
    setSelectedFurnishingStatus,
    selectedFurnishingDetails,
    setSelectedFurnishingDetails,

    setSelectedBedrooms,
    selectedBedrooms,
    selectedPostedBy,
    setSelectedPostedBy,
    selectedPropertyType,
    setSelectedPropertyType,
    selectedContructionStatus,
    setSelectedConstructionStatus,
    CommercialProperties,
    lookingTo,
    stepperState,
    setStepperState,
    stepperCount,
    setStepperCount,
    setSelectedLookingTo,
    selectedLookingTo,
    selectedPropertyCategory,
    setSelectedPropertyCategory,
    light,
    Fans,
    AC,
    wardrobe,
    geyser,
    furnishingDetails,
    setLight,
    setFans,
    setAC,
    setWardrobe,
    setGeyser,
    isFurnished,
    setIsFurnished,
    possesionIn,
    selectedAvailabilityStatus,
    setSelectedAvailabiltyStatus,
    properties,
    setProperties,

    rentOutTo,
    carpetArea,
    setCarpetArea,
    superBuiltUpArea,
    setSuperBuiltUpArea,
    builtUpArea,
    setBuiltUpArea,
    selectedPrice,
    setSelectedPrice,
    isFoodAvailable,
    setIsFoodAvailable,
    houseRules,
    setHouseRules,
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

    propertyOnFloor,
    coveredParkingSpace,
    setCoveredParkingSpace,
    openParkingSpace,
    setOpenParkingSpace,
    rentPrice,
    rentInfoPrice,
    durationOfAgreement,
    noticeMonths,

    pgRoomType,
    sharingPeopleCount,
    pgRoomInfo,
    pgAvailableFor,

    foodDetails,
    mealType,
    availableMealsTiming,
    chargesForFood,
    data,
    setData,
    furnishingStatus,
    setFurnishingStatus,

    // plot

    plotboundaryWall,
    plotopenSides,
    plotContruction,
    selectedAllowedFloors,
    setSelectedAllowedFloor,
    selectedNoOfOpenSides,
    setSelectedNoOfOpenSides,
    selectedConstructionDone,
    setSelectedContructionDone,
    selectedPlotArea,
    setSelectedPlotArea,
    selectedBoundaryWall,
    setSelectedBoundaryWall,

    selectedBedrooms,
    setSelectedBedrooms,
    selectedBathrooms,
    setSelectedBathRooms,
    selectedBalconies,
    setSelectedBalconies,

    selectedpropertyFeatures,
    setSelectedPropertyFeatures,
    selectedLocationAdvantages,
    setSelectedLocationAdvantages,
    selectedAmenities,
    setSelectedAmenities,
    selectedPropertyFacing,
    setSelectedPropertyFacing,
    selectedOtherFeatures,
    setSelectedOtherFeatures,
    selectedFlooringType,
    setSelectedFlooringType,

    selectedRentOutTo,
    setSelectedRentOutTo,
    selectedAvailableFrom,
    setSelectedAvailableFrom,

    setSelectedRentInfoPrice,
    selectedDurationOfAgreement,
    setSelectedDurationOfAgreement,
    selectedNoticeMonths,
    setSelectedNoticeMonths,
    selectedRentPrice,
    setSelectedRentPrice,
    selectedRentInfoPrice,
    selectedSecurityDeposit,
    setSelectedSecurityDeposit,

    selectedPgRoomType,
    setSelectedPgRoomType,
    selectedSharingPeopleCount,
    setSelectedSharingPeopleCount,
    selectedPgRoomInfo,
    setSelectedPgRoomInfo,
    selectedPgAvailableFor,
    setSelectedPgAvailableFor,
    selectedPgFoodDetails,
    setSelectedPgFoodDetails,
    selectedPgMealType,
    setSelectedPgMealType,
    selectedAvailableMealsTiming,
    setSelectedAvailableMealsTiming,
    selectedChargesForFood,
    setSelectedChargesForFood,

    locationAdvantages,
    propertyFacing,
    otherFeatures,
    flooringType,
    amenities,
    PropertyFeatures,
    selectedCommercialProperties,
    setSelectedCommercialProperties,

    // properties page
    propertiesRoute,
    setPropertiesRoute,
    propertyFilterByCategory,
    propertyFilterByFor,
    filteredPropertyCategory,
    filteredPropertyFor,
    setFilteredPropertyCategory,
    setFilteredPropertyFor,
    filteredPropertyType,
    setFilteredPropertyType,
    filteredPostedBy,
    setFilteredPostedBy,
    filteredContructionStatus,
    setFilteredConstructionStatus,
    filteredBedrooms,
    setFilteredBedrooms,
    filteredFurnishingStatus,
    setFilteredFurnishingStatus,
    filteredAvailableFor,
    setFilteredAvailableFor,
    filteredSharingCount,
    setFilteredSharingCount,
    showFilters,
    setShowFilters,
    contactInfo,
    showContactInfo,
    selectedOtherRooms,
    setSelectedOtherRooms,
    selectedPgInfo,
    setSelectedPgInfo,
    pgSuitableFor,
    setPgSuitableFor,
    selectedPgSuitableFor,
    setSelectedPgSuitableFor,
    selectedPgCapacity,
    setSelectedPgCapacity,
    loading,
    setLoading,
    changePasswordComp,
    setChangePasswordComp,

    selectedBuyBudget , setSelectedBuyBudget , selectedRentBudget , setSelectedRentBudget , selectedPgRentBudget , setSelectedPgRentBudget ,
    
  };
  return (
    <propertyContext.Provider value={value}>
      {props.children}
    </propertyContext.Provider>
  );
};
export { propertyContext };
export default RealEstateContext;
