import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoMoveToStart } from "react-icons/go";
import { propertyContext } from "../context/RealEstateContext";
const PropertyUploaded = () => {
  const navigateTo = useNavigate();
  const {
    setStepperCount,
    setSelectedBedrooms,
    setSelectedBathRooms,
    setSelectedBalconies,
    setCarpetArea,
    setSuperBuiltUpArea,
    setBuiltUpArea,
    setSelectedPropertyType,
    setLight,
    setFans,
    setAC,
    setWardrobe,
    setGeyser,
    setSelectedTotalFloor,
    setSelectedFloorNumber,
    setSelectedPropertyAge,
    setSelectedPossessionIn,
    setSelectedFurnishingStatus,
    setSelectedFurnishingDetails,
    setSelectedLookingTo,
    setSelectedPropertyCategory,
    setSelectedCommercialProperties,
    setIsFurnished,
    setSelectedAvailabiltyStatus,
    setSelectedOtherRooms,
    setCoveredParkingSpace,
    setOpenParkingSpace,
    setSelectedPrice,
    setIsFoodAvailable,
    setHouseRules,
    setSelectedRentPrice,
    setSelectedRentInfoPrice,
    setSelectedDurationOfAgreement,
    setSelectedNoticeMonths,
    setSelectedSecurityDeposit,
    setSelectedRentOutTo,
    setSelectedAvailableFrom,
    setSelectedAllowedFloor,
    setSelectedNoOfOpenSides,
    setSelectedContructionDone,
    setSelectedPlotArea,
    setSelectedBoundaryWall,
    setSelectedPropertyFeatures,
    setSelectedAmenities,
    setSelectedLocationAdvantages,
    setSelectedPropertyFacing,
    setSelectedOtherFeatures,
    setSelectedFlooringType,
    setSelectedPgRoomType,
    setSelectedSharingPeopleCount,
    setSelectedPgRoomInfo,
    setSelectedPgAvailableFor,
    setSelectedPgFoodDetails,
    setSelectedPgMealType,
    setSelectedAvailableMealsTiming,
    setSelectedChargesForFood,
    setSelectedPgInfo,
    setSelectedPgSuitableFor,
    setSelectedPgCapacity,
    setImages,
    setSpecifyBedrooms,
    setSpecifyBathrooms,
    setLocality,
    setSublocality,
    setPostalCode,
    setPremise,
    setHouseNo,
  } = useContext(propertyContext);

  const onGoToHomePage = () => {
    navigateTo("/");
    setStepperCount(1);
    setSelectedBedrooms(1);
    setSelectedBathRooms(1);
    setSelectedBalconies(0);
    setCarpetArea("");
    setSuperBuiltUpArea("");
    setBuiltUpArea("");
    setSelectedPropertyType(-1);
    setLight(0);
    setFans(0);
    setAC(0);
    setWardrobe(0);
    setGeyser(0);
    setSelectedTotalFloor("");
    setSelectedFloorNumber("");
    setSelectedPropertyAge("");
    setSelectedPossessionIn("");
    setSelectedFurnishingStatus(-1);
    setSelectedFurnishingDetails([]);
    setSelectedLookingTo(-1);
    setSelectedPropertyCategory(0);
    setSelectedCommercialProperties(-1);
    setIsFurnished(false);
    setSelectedAvailabiltyStatus(-1);
    setSelectedOtherRooms([]);
    setCoveredParkingSpace(0);
    setOpenParkingSpace(0);
    setSelectedPrice("");
    setIsFoodAvailable(false);
    setHouseRules("");
    setSelectedRentPrice("");
    setSelectedRentInfoPrice("");
    setSelectedDurationOfAgreement("");
    setSelectedNoticeMonths("");
    setSelectedSecurityDeposit("");
    setSelectedRentOutTo("");
    setSelectedAvailableFrom("");
    setSelectedAllowedFloor("");
    setSelectedNoOfOpenSides(-1);
    setSelectedContructionDone("");
    setSelectedPlotArea("");
    setSelectedBoundaryWall("");
    setSelectedPropertyFeatures([]);
    setSelectedAmenities([]);
    setSelectedLocationAdvantages([]);
    setSelectedPropertyFacing("");
    setSelectedOtherFeatures([]);
    setSelectedFlooringType("");
    setSelectedPgRoomType("");
    setSelectedSharingPeopleCount("");
    setSelectedPgRoomInfo([]);
    setSelectedPgAvailableFor("");
    setSelectedPgFoodDetails(-1);
    setSelectedPgMealType([]);
    
    setSelectedAvailableMealsTiming([]);
    setSelectedChargesForFood("");
    setSelectedPgInfo([]);
    setSelectedPgSuitableFor("");
    setSelectedPgCapacity("");
    setImages([""]);
    setSpecifyBedrooms(false);
    setSpecifyBathrooms(false);

    setLocality(""); 
    setSublocality(""); 
      setPostalCode(""); 
      setPremise(""); 
      setHouseNo("");
  };
  return (
    <div className="text-[#f4f5f7] box-shadow flex flex-col gap-4 h-[70vh] overflow-y-scroll p-10  items-center justify-center ">
      <h1 className="text-5xl capitalize leading-relaxed tracking-wider">
        Your property have been successfully uploaded !
      </h1>

      <button
        onClick={() => {
          onGoToHomePage();
        }}
        className="self-start px-4 py-1 rounded-xl bg-slate-400 text-slate-900 text-[1.2rem] flex items-center justify-center gap-1 "
      >
        <span>
          <GoMoveToStart />
        </span>
        Go to Home Page
      </button>
    </div>
  );
};

export default PropertyUploaded;
