import React, { useState, useEffect, useContext } from "react";
import ContinueBtn from "./ContinueBtn";
import Back from "./Back";
import { propertyContext } from "../context/RealEstateContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const AboutProperty = () => {
  const handleFunctionOnContinue = async () => {
    // data processing ...
    // bedrooms , bathrooms , ...
    if (
      selectedLookingTo == 0 &&
      selectedPropertyCategory == 0 &&
      (selectedPropertyType == 0 ||
        selectedPropertyType == 1 ||
        selectedPropertyType == 3 ||
        selectedPropertyType == 4)
    ) {
      setData((prevData) => {
        return {
          ...prevData,
          bedrooms: Number(selectedBedrooms),
          bathrooms: Number(selectedBathrooms),
          balconies: Number(selectedBalconies),
        };
      });
      // area details
      if (carpetArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            carpetArea: Number(carpetArea),
          };
        });
      } else if (builtUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            builtUpArea: Number(builtUpArea),
          };
        });
      } else if (superBuiltUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,

            superBuiltUpArea: Number(superBuiltUpArea),
          };
        });
      } else {
        toast.error("Please provide atleast one area detail");
        return false;
      }
      // furnishing status
      if (selectedFurnishingStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            furnishing: selectedFurnishingStatus,
          };
        });
      } else {
        toast.error("Please provide furnishing status");
        return false;
      }

      if (!isFurnished && data?.furnishingDetails) {
        const newData = {
          ...data,
        };
        delete newData?.furnishingDetails;
        delete newData?.otherFurnishingDetails;
        setData(newData);
      }

      //
      if (
        selectedFurnishingStatus == "Semi-Furnished" 
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails)
        {
          toast.error("Please provide more furnishing information ") ; 
          return ; 
        }
        if (
           data?.otherFurnishingDetails?.length < 2 ||
          data?.furnishingDetails?.length < 2
        ) {
          toast.error("Please provide more furnishing information ");
          return  ;
        }
      }

      

       if (
        selectedFurnishingStatus == "Furnished"
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 3 ||
          data?.furnishingDetails?.length < 3
        ) {
          toast.error("Please provide more furnishing information");
          return  ;
        }
      }

      // parking details ..
      if (coveredParkingSpace == 0 && openParkingSpace == 0) {
        toast.error("Please provide parking space details");
        return false;
      }

      // availability status
      if (selectedAvailabilityStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            availabilityStatus:
              selectedAvailabilityStatus == 0
                ? "ready to move"
                : "under construction",
          };
        });
        if (selectedAvailabilityStatus == 0) {
          if (selectedPropertyAge == -1) {
            toast.error("Please specify property age");
            return false;
          } else {
            // setData
            if (data?.possesionIn) {
              const newData = {
                ...data,
              };
              delete newData.possesionIn;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                propertyAge: selectedPropertyAge,
              };
            });
          }
        } else if (selectedAvailabilityStatus == 1) {
          if (selectedPossessionIn == -1) {
            toast.error("Please specify property possession in ");
            return false;
          } else {
            // set data
            if (data?.propertyAge) {
              const newData = {
                ...data,
              };
              delete newData.propertyAge;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                possesionIn: selectedPossessionIn,
              };
            });
          }
        }
      } else {
        toast.error("Please provide availability status");
        return false;
      }
      // floor number
      if (selectedFloorNumber == "") {
        toast.error("please specify the floor number");
        return false;
      } else {
        setData((data) => {
          return {
            ...data,
            floorNumber: selectedFloorNumber,
          };
        });
      }
      // total floors
      if (selectedTotalFloors == "") {
        toast.error("please specify the total floors");
        return false;
      }

      if (selectedTotalFloors < selectedFloorNumber) {
        toast.error("Invalid floor number");
        return false;
      }
    } else if (
      selectedLookingTo == 0 &&
      selectedPropertyCategory == 0 &&
      (selectedPropertyType == 2 || selectedPropertyType == 6)
    ) {
      // independent builder floor
      setData((prevData) => {
        return {
          ...prevData,
          bedrooms: Number(selectedBedrooms),
          bathrooms: Number(selectedBathrooms),
          balconies: Number(selectedBalconies),
        };
      });

      // area details
      if (carpetArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            carpetArea: Number(carpetArea),
          };
        });
      } else if (builtUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            builtUpArea: Number(builtUpArea),
          };
        });
      } else if (superBuiltUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,

            superBuiltUpArea: Number(superBuiltUpArea),
          };
        });
      } else {
        toast.error("Please provide atleast one area detail");
        return false;
      }

      // furnishing status

      if (selectedFurnishingStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            furnishing: selectedFurnishingStatus,
          };
        });
      } else {
        toast.error("Please provide furnishing status");
        return false;
      }

      if (!isFurnished && data?.furnishingDetails) {
        const newData = {
          ...data,
        };
        delete newData?.furnishingDetails;
        delete newData?.otherFurnishingDetails;
        setData(newData);
      }

      if (
        selectedFurnishingStatus== "Semi-Furnished" 
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails)
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 2 ||
          data?.furnishingDetails?.length < 2
        ) {
          toast.error("Please provide more furnishing information ");
          return  ;
        }
      }

      

       if (
        selectedFurnishingStatus== "Furnished"
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 3 ||
          data?.furnishingDetails?.length < 3
        ) {
          toast.error("Please provide more furnishing information");
          return  ;
        }
      }


      // parking details ..
      if (coveredParkingSpace == 0 && openParkingSpace == 0) {
        toast.error("Please provide parking space details");
        return false;
      }

      // availability status
      if (selectedAvailabilityStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            availabilityStatus:
              selectedAvailabilityStatus == 0
                ? "ready to move"
                : "under construction",
          };
        });
        if (selectedAvailabilityStatus == 0) {
          if (selectedPropertyAge == -1) {
            toast.error("Please specify property age");
            return false;
          } else {
            // setData
            if (data?.possesionIn) {
              const newData = {
                ...data,
              };
              delete newData.possesionIn;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                propertyAge: selectedPropertyAge,
              };
            });
          }
        } else if (selectedAvailabilityStatus == 1) {
          if (selectedPossessionIn == -1) {
            toast.error("Please specify property possession in ");
            return false;
          } else {
            // set data
            if (data?.propertyAge) {
              const newData = {
                ...data,
              };
              delete newData.propertyAge;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                possesionIn: selectedPossessionIn,
              };
            });
          }
        }
      } else {
        toast.error("Please provide availability status");
        return false;
      }
      // total floors
      if (selectedTotalFloors == "") {
        toast.error("please specify the total floors");
        return false;
      }
    } else if (
      selectedLookingTo == 1 &&
      selectedPropertyCategory == 0 &&
      (selectedPropertyType == 0 ||
        selectedPropertyType == 1 ||
        selectedPropertyType == 3 ||
        selectedPropertyType == 4)
    ) {
      setData((prevData) => {
        return {
          ...prevData,
          bedrooms: Number(selectedBedrooms),
          bathrooms: Number(selectedBathrooms),
          balconies: Number(selectedBalconies),
        };
      });
      // area details
      if (carpetArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            carpetArea: Number(carpetArea),
          };
        });
      } else if (builtUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            builtUpArea: Number(builtUpArea),
          };
        });
      } else if (superBuiltUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,

            superBuiltUpArea: Number(superBuiltUpArea),
          };
        });
      } else {
        toast.error("Please provide atleast one area detail");
        return false;
      }
      // furnishing status

      if (selectedFurnishingStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            furnishing: selectedFurnishingStatus,
          };
        });
      } else {
        toast.error("Please provide furnishing status");
        return false;
      }

      if (!isFurnished && data?.furnishingDetails) {
        const newData = {
          ...data,
        };
        delete newData?.furnishingDetails;
        delete newData?.otherFurnishingDetails;
        setData(newData);
      }

      if (
        selectedFurnishingStatus== "Semi-Furnished" 
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 2 ||
          data?.furnishingDetails?.length < 2
        ) {
          toast.error("Please provide more furnishing information ");
          return  ;
        }
      }

      

       if (
        selectedFurnishingStatus== "Furnished"
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails)
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 3 ||
          data?.furnishingDetails?.length < 3
        ) {
          toast.error("Please provide more furnishing information");
          return  ;
        }
      }
      // parking
      if (coveredParkingSpace == 0 && openParkingSpace == 0) {
        toast.error("Please provide parking space details");
        return false;
      }

      // availablity status
      if (selectedAvailabilityStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            availabilityStatus:
              selectedAvailabilityStatus == 0
                ? "ready to move"
                : "under construction",
          };
        });
        if (selectedAvailabilityStatus == 0) {
          if (selectedPropertyAge == -1) {
            toast.error("Please specify property age");
            return false;
          } else {
            // setData
            if (data?.possesionIn) {
              const newData = {
                ...data,
              };
              delete newData.possesionIn;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                propertyAge: selectedPropertyAge,
              };
            });
          }
        } else if (selectedAvailabilityStatus == 1) {
          if (selectedPossessionIn == -1) {
            toast.error("Please specify property possession in ");
            return false;
          } else {
            // set data
            if (data?.propertyAge) {
              const newData = {
                ...data,
              };
              delete newData.propertyAge;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                possesionIn: selectedPossessionIn,
              };
            });
          }
        }
      } else {
        toast.error("Please provide availability status");
        return false;
      }

      if (selectedFloorNumber == "") {
        toast.error("please specify the floor number");
        return false;
      }
      // total floors
      if (selectedTotalFloors == "") {
        toast.error("please specify the total floors");
        return false;
      }
      if (selectedTotalFloors < selectedFloorNumber) {
        toast.error("Invalid floor number");
        return false;
      }

      if (selectedRentOutTo == "") {
        toast.error("Please specify whom do you want to rent out to");
        return false;
      }
      if (selectedAvailableFrom == "") {
        toast.error("Please specify the available from date");
        return false;
      }
    } else if (
      selectedLookingTo == 1 &&
      selectedPropertyCategory == 0 &&
      (selectedPropertyType == 2 || selectedPropertyType == 6)
    ) {
      setData((prevData) => {
        return {
          ...prevData,
          bedrooms: Number(selectedBedrooms),
          bathrooms: Number(selectedBathrooms),
          balconies: Number(selectedBalconies),
        };
      });
      // area details
      if (carpetArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            carpetArea: Number(carpetArea),
          };
        });
      } else if (builtUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            builtUpArea: Number(builtUpArea),
          };
        });
      } else if (superBuiltUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,

            superBuiltUpArea: Number(superBuiltUpArea),
          };
        });
      } else {
        toast.error("Please provide atleast one area detail");
        return false;
      }
      // furnishing status

      if (selectedFurnishingStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            furnishing: selectedFurnishingStatus,
          };
        });
      } else {
        toast.error("Please provide furnishing status");
        return false;
      }

      if (!isFurnished && data?.furnishingDetails) {
        const newData = {
          ...data,
        };
        delete newData?.furnishingDetails;
        delete newData?.otherFurnishingDetails;
        setData(newData);
      }

      if (
        selectedFurnishingStatus== "Semi-Furnished" 
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 2 ||
          data?.furnishingDetails?.length < 2
        ) {
          toast.error("Please provide more furnishing information ");
          return  ;
        }
      }

      

       if (
        selectedFurnishingStatus== "Furnished"
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 3 ||
          data?.furnishingDetails?.length < 3
        ) {
          toast.error("Please provide more furnishing information");
          return  ;
        }
      }
      // parking
      if (coveredParkingSpace == 0 && openParkingSpace == 0) {
        toast.error("Please provide parking space details");
        return false;
      }

      // availablity status
      if (selectedAvailabilityStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            availabilityStatus:
              selectedAvailabilityStatus == 0
                ? "ready to move"
                : "under construction",
          };
        });
        if (selectedAvailabilityStatus == 0) {
          if (selectedPropertyAge == -1) {
            toast.error("Please specify property age");
            return false;
          } else {
            // setData
            if (data?.possesionIn) {
              const newData = {
                ...data,
              };
              delete newData.possesionIn;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                propertyAge: selectedPropertyAge,
              };
            });
          }
        } else if (selectedAvailabilityStatus == 1) {
          if (selectedPossessionIn == -1) {
            toast.error("Please specify property possession in ");
            return false;
          } else {
            // set data
            if (data?.propertyAge) {
              const newData = {
                ...data,
              };
              delete newData.propertyAge;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                possesionIn: selectedPossessionIn,
              };
            });
          }
        }
      } else {
        toast.error("Please provide availability status");
        return false;
      }
      // floor number

      if (selectedFloorNumber == "") {
        toast.error("please specify the floor number");
        return false;
      }
      // total floors
      if (selectedTotalFloors == "") {
        toast.error("please specify the total floors");
        return false;
      }
      if (selectedTotalFloors < selectedFloorNumber) {
        toast.error("Invalid floor number");
        return false;
      }

      if (selectedRentOutTo == "") {
        toast.error("Please specify whom do you want to rent out to");
        return false;
      }
      // available from
      if (selectedAvailableFrom == "") {
        toast.error("Please specify the available from date");
        return false;
      } else {
      }
    } else if (
      (selectedLookingTo == 0 || selectedLookingTo == 1) &&
      (selectedPropertyCategory == 0 || selectedPropertyCategory == 1) &&
      (selectedPropertyType == 5 || selectedCommercialProperties == 0)
    ) {
      if (selectedPlotArea == "") {
        toast.error("Please specify plot area");
        return false;
      }
      if (selectedAllowedFloors == "") {
        toast.error("Please specify allowed floors");
        return false;
      }
      if (selectedBoundaryWall == "") {
        toast.error("Please answer is there any boundary wall");
        return false;
      }
      if (selectedNoOfOpenSides == "") {
        toast.error("please answer number of open sides");
        return false;
      }
      if (selectedConstructionDone == "") {
        toast.error("please answer any construction done on property ?");
        return false;
      }
    }

    if (
      // pg
      selectedLookingTo == 2 &&
      selectedPropertyCategory == 0 &&
      (selectedPropertyType == 0 ||
        selectedPropertyType == 1 ||
        selectedPropertyType == 3 ||
        selectedPropertyType == 4)
    ) {
      setData((prevData) => {
        return {
          ...prevData,
          bedrooms: Number(selectedBedrooms),
          bathrooms: Number(selectedBathrooms),
          balconies: Number(selectedBalconies),
        };
      });
      // area details
      if (carpetArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            carpetArea: Number(carpetArea),
          };
        });
      } else if (builtUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            builtUpArea: Number(builtUpArea),
          };
        });
      } else if (superBuiltUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,

            superBuiltUpArea: Number(superBuiltUpArea),
          };
        });
      } else {
        toast.error("Please provide atleast one area detail");
        return false;
      }

      // furnishing status
      if (selectedFurnishingStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            furnishing: selectedFurnishingStatus,
          };
        });
      } else {
        toast.error("Please provide furnishing status");
        return false;
      }

      if (!isFurnished && data?.furnishingDetails) {
        const newData = {
          ...data,
        };
        delete newData?.furnishingDetails;
        delete newData?.otherFurnishingDetails;
        setData(newData);
      }

      if (
        selectedFurnishingStatus== "Semi-Furnished" 
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 2 ||
          data?.furnishingDetails?.length < 2
        ) {
          toast.error("Please provide more furnishing information ");
          return  ;
        }
      }

      

       if (
        selectedFurnishingStatus == "Furnished"
       
      ) {
        if(!data?.otherFurnishingDetails || !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 3 ||
          data?.furnishingDetails?.length < 3
        ) {
          toast.error("Please provide more furnishing information");
          return  ;
        }
      }

      // parking details ..
      if (coveredParkingSpace == 0 && openParkingSpace == 0) {
        toast.error("Please provide parking space details");
        return false;
      }

      // pg rooms type
      if (selectedPgRoomType == "") {
        toast.error("Please select pg room type");
        return false;
      }

      // pg sharing people count
      if (selectedPgRoomType == "sharing" && selectedSharingPeopleCount == "") {
        toast.error("Please select pg sharing count");
        return false;
      }

      // pg available for

      if (selectedPgAvailableFor == "") {
        toast.error("Please select pg available for");
        return false;
      }

      // floor number
      if (selectedFloorNumber == "") {
        toast.error("please specify the floor number");
        return false;
      }
      // total floors
      if (selectedTotalFloors == "") {
        toast.error("please specify the total floors");
        return false;
      }
      if (selectedTotalFloors < selectedFloorNumber) {
        toast.error("Invalid floor number");
        return false;
      }

      // availabilty status
      if (selectedAvailabilityStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            availabilityStatus:
              selectedAvailabilityStatus == 0
                ? "ready to move"
                : "under construction",
          };
        });
        if (selectedAvailabilityStatus == 0) {
          if (selectedPropertyAge == -1) {
            toast.error("Please specify property age");
            return false;
          } else {
            // setData
            if (data?.possesionIn) {
              const newData = {
                ...data,
              };
              delete newData.possesionIn;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                propertyAge: selectedPropertyAge,
              };
            });
          }
        } else if (selectedAvailabilityStatus == 1) {
          if (selectedPossessionIn == -1) {
            toast.error("Please specify property possession in ");
            return false;
          } else {
            // set data
            if (data?.propertyAge) {
              const newData = {
                ...data,
              };
              delete newData.propertyAge;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                possesionIn: selectedPossessionIn,
              };
            });
          }
        }
      } else {
        toast.error("Please provide availability status");
        return false;
      }

      // available from
      if (selectedAvailableFrom == "") {
        toast.error("Please specify the available from date");
        return false;
      }

      // pg capacity
      if (selectedPgCapacity !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            pgCapacity: Number(selectedPgCapacity),
          };
        });
      }
      // pg suitable for
      if (selectedPgSuitableFor == "") {
        toast.error("please select for whom your pg is suitable for");
      } else {
        setData((prevData) => {
          return {
            ...prevData,
            pgSuitableFor: selectedPgSuitableFor,
          };
        });
      }
    }

    if (
      selectedLookingTo == 2 &&
      selectedPropertyCategory == 0 &&
      (selectedPropertyType == 2 || selectedPropertyType == 6)
    ) {
      setData((prevData) => {
        return {
          ...prevData,
          bedrooms: Number(selectedBedrooms),
          bathrooms: Number(selectedBathrooms),
          balconies: Number(selectedBalconies),
        };
      });
      // area details
      if (carpetArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            carpetArea: Number(carpetArea),
          };
        });
      } else if (builtUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            builtUpArea: Number(builtUpArea),
          };
        });
      } else if (superBuiltUpArea !== "") {
        setData((prevData) => {
          return {
            ...prevData,

            superBuiltUpArea: Number(superBuiltUpArea),
          };
        });
      } else {
        toast.error("Please provide atleast one area detail");
        return false;
      }

      // furnishing status
      if (selectedFurnishingStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            furnishing: selectedFurnishingStatus,
          };
        });
      } else {
        toast.error("Please provide furnishing status");
        return false;
      }

      if (!isFurnished && data?.furnishingDetails) {
        const newData = {
          ...data,
        };
        delete newData?.furnishingDetails;
        delete newData?.otherFurnishingDetails;
        setData(newData);
      }
      if (
        selectedFurnishingStatus == "Semi-Furnished" 
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails )
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 2 ||
          data?.furnishingDetails?.length < 2
        ) {
          toast.error("Please provide more furnishing information ");
          return  ;
        }
      }
       if (
        selectedFurnishingStatus == "Furnished"
       
      ) {
        if(!data?.otherFurnishingDetails ||  !data?.
          furnishingDetails)
          {
            toast.error("Please provide more furnishing information ") ; 
            return ; 
          }
        if (
          data?.otherFurnishingDetails?.length < 3 ||
          data?.furnishingDetails?.length < 3
        ) {
          toast.error("Please provide more furnishing information");
          return  ;
        }
      }

      // parking details ..
      if (coveredParkingSpace == 0 && openParkingSpace == 0) {
        toast.error("Please provide parking space details");
        return false;
      }

      // pg rooms

      if (selectedPgRoomType == "") {
        toast.error("Please select pg room type");
        return false;
      }
      if (selectedPgRoomType == "sharing" && selectedSharingPeopleCount == "") {
        toast.error("Please select pg sharing count");
        return false;
      }

      if (selectedPgAvailableFor == "") {
        toast.error("Please select pg available for");
        return false;
      }

      // floor number
      // if (selectedFloorNumber == "") {
      //   toast.error("please specify the floor number");
      //   return false;
      // }
      // total floors
      if (selectedTotalFloors == "") {
        toast.error("please specify the total floors");
        return false;
      }

      // availabilty status
      if (selectedAvailabilityStatus !== -1) {
        setData((prevData) => {
          return {
            ...prevData,
            availabilityStatus:
              selectedAvailabilityStatus == 0
                ? "ready to move"
                : "under construction",
          };
        });
        if (selectedAvailabilityStatus == 0) {
          if (selectedPropertyAge == -1) {
            toast.error("Please specify property age");
            return false;
          } else {
            // setData
            if (data?.possesionIn) {
              const newData = {
                ...data,
              };
              delete newData.possesionIn;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                propertyAge: selectedPropertyAge,
              };
            });
          }
        } else if (selectedAvailabilityStatus == 1) {
          if (selectedPossessionIn == -1) {
            toast.error("Please specify property possession in ");
            return false;
          } else {
            // set data
            if (data?.propertyAge) {
              const newData = {
                ...data,
              };
              delete newData.propertyAge;
              setData(newData);
            }
            setData((prevData) => {
              return {
                ...prevData,
                possesionIn: selectedPossessionIn,
              };
            });
          }
        }
      } else {
        toast.error("Please provide availability status");
        return false;
      }

      // available from
      if (selectedAvailableFrom == "") {
        toast.error("Please specify the available from date");
        return false;
      }
      // pg capacity
      if (selectedPgCapacity !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            pgCapacity: Number(selectedPgCapacity),
          };
        });
      }

      // pg suitable for
      if (selectedPgSuitableFor == "") {
        toast.error("please select for whom your pg is suitable for");
      } else {
        setData((prevData) => {
          return {
            ...prevData,
            pgSuitableFor: selectedPgSuitableFor,
          };
        });
      }
    }

    return true;
  };

  const {
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
    propertyOnFloor,
    coveredParkingSpace,
    setCoveredParkingSpace,
    openParkingSpace,
    setOpenParkingSpace,
    selectedLookingTo,
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

    rentOutTo,
    pgRoomType,
    sharingPeopleCount,
    pgRoomInfo,
    pgAvailableFor,
    selectedPropertyType,

    plotboundaryWall,
    plotopenSides,
    plotContruction,
    data,
    setData,

    selectedBedrooms,
    setSelectedBedrooms,
    selectedBathrooms,
    setSelectedBathRooms,
    selectedBalconies,
    setSelectedBalconies,
    furnishingStatus,
    setFurnishingStatus,
    carpetArea,
    setCarpetArea,
    superBuiltUpArea,
    setSuperBuiltUpArea,
    builtUpArea,
    setBuiltUpArea,

    // plot

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
    selectedRentOutTo,
    setSelectedRentOutTo,
    selectedAvailableFrom,
    setSelectedAvailableFrom,

    // pg

    selectedPgRoomType,
    setSelectedPgRoomType,
    selectedSharingPeopleCount,
    setSelectedSharingPeopleCount,
    selectedPgRoomInfo,
    setSelectedPgRoomInfo,
    selectedPgAvailableFor,
    setSelectedPgAvailableFor,
    selectedPropertyCategory,
    selectedCommercialProperties,
    pgSuitableFor,
    setPgSuitableFor,
    selectedPgSuitableFor,
    setSelectedPgSuitableFor,
    selectedPgCapacity,
    setSelectedPgCapacity,
    selectedOtherRooms,
    setSelectedOtherRooms,
    selectedPgInfo,
    setSelectedPgInfo,
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
  } = useContext(propertyContext);

  return (
    <motion.div
      initial={{ opacity: 0, x: "300px" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "300px" }}
      transition={{ duration: 1, ease: "easeInOut", duration: 0.5 }}
      className="text-[#f4f5f7] box-shadow flex flex-col gap-6 h-[70vh] overflow-y-scroll p-10 "
    >
      <Back />
      <h1 className="text-3xl ">Tell us about your property</h1>

      {selectedPropertyType !== 5 && selectedPropertyCategory == 0 && (
        <div className="flex gap-3 flex-col ">
          {/* bedrooms */}
          <h1 className="text-2xl">Add Room Details</h1>
          <p className="capitalize">No. of bedrooms</p>
          <div className="flex gap-4">
            {bedrooms.map((room, index) => {
              // add to continue

              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSpecifyBedrooms(false);
                    setSelectedBedrooms(room);
                  }}
                  className={`${
                    selectedBedrooms == room
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  }  px-3 py-1 rounded-full ${
                    selectedPropertyType == 3 && index > 0 ? "hidden" : "block"
                  }`}
                  key={index}
                >
                  {room}
                </motion.button>
              );
            })}
          </div>
          {/* specify bedrooms  */}
          <div className="flex items-center  gap-4  ">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSpecifyBedrooms(true)}
              className="bg-[#f4f5f7] text-slate-900 px-3 py-1 rounded-full"
            >
              {" "}
              Specify
            </motion.button>
            {specifyBedrooms && (
              <div className="flex gap-4 ">
                <motion.input
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onChange={(e) => {
                    setSelectedBedrooms(e.target.value);
                  }}
                  value={selectedBedrooms}
                  min={5}
                  max={22}
                  className="px-3 py-1 w-48 text-xl outline-none bg-transparent border-2  rounded-md  "
                  name="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {/* bathrooms */}
            <p className="capitalize">No. of bathrooms</p>
            <div className="flex gap-4">
              {bathrooms.map((bathroom, index) => {
                return (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      setSpecifyBathrooms(false);
                      setSelectedBathRooms(bathroom);
                    }}
                    className={`${
                      selectedPropertyType == 3 && index > 0
                        ? "hidden"
                        : "block"
                    } ${
                      selectedBathrooms == bathroom
                        ? "bg-[#396d8c] text-[#f4f5f7]"
                        : "bg-[#f4f5f7] text-slate-900"
                    }  px-3 py-1 rounded-full `}
                    key={index}
                  >
                    {bathroom}
                  </motion.button>
                );
              })}
            </div>
            {/* specify bathrooms */}
            <div className="flex items-center  gap-4  ">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSpecifyBathrooms(true)}
                className="bg-[#f4f5f7] text-slate-900 px-3 py-1 rounded-full"
              >
                {" "}
                Specify
              </motion.button>
              {specifyBathrooms && (
                <div className="flex gap-4 ">
                  <motion.input
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onChange={(e) => {
                      setSelectedBathRooms(e.target.value);
                    }}
                    value={selectedBathrooms}
                    min={5}
                    max={22}
                    className="px-3 py-1 w-48 text-xl outline-none bg-transparent border-2  rounded-md  "
                    name="bedrooms"
                    type="number"
                    placeholder="Bedrooms"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* balconies */}
            <p>No. of balconies</p>
            <div className="flex gap-4">
              {balconies.map((balconie, index) => {
                return (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      setSelectedBalconies(balconie);
                    }}
                    className={` px-3 py-1 rounded-full ${
                      selectedBalconies == balconie
                        ? "bg-[#396d8c] text-[#f4f5f7]"
                        : "bg-[#f4f5f7] text-slate-900"
                    }  `}
                    key={index}
                  >
                    {balconie}
                  </motion.button>
                );
              })}
            </div>
            {/* specify balconie */}
          </div>
        </div>
      )}

      {/* area details  */}
      {selectedPropertyType !== 5 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4 self-start">
          {/* area details */}

          {/* carpet area > builtup area > super builtup area  */}
          <h2 className="text-2xl capitalize ">Add area details</h2>
          <motion.input
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            min={0}
            max={1000000}
            onChange={(e) => {
              setCarpetArea(e.target.value);
            }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
            type="number"
            placeholder="Carpet Area"
            name="carpetArea"
            value={carpetArea}
          />
          <motion.input
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            min={0}
            max={1000000}
            onChange={(e) => {
              setSuperBuiltUpArea(e.target.value);
            }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
            type="number"
            placeholder="Super Built-Up Area"
            name="SuperBuiltUpArea"
            value={superBuiltUpArea}
          />
          <motion.input
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            min={0}
            max={1000000}
            onChange={(e) => {
              setBuiltUpArea(e.target.value);
            }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
            type="number"
            placeholder="Built-up Area"
            name="BuilUpArea"
            value={builtUpArea}
          />
        </div>
      )}

      {selectedPropertyType !== 5 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4">
          {/* other rooms */}

          <h1 className="text-2xl capitalize">
            Other rooms <span className="text-sm">(optional)</span>
          </h1>

          <div className="flex gap-4">
            {otherRooms.map((room, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    if (
                      selectedOtherRooms.some((item, index) => item == room)
                    ) {
                      const newSelectedOtherRooms = selectedOtherRooms.filter(
                        (item) => item != room
                      );
                      setSelectedOtherRooms(newSelectedOtherRooms);
                      setData((prevData) => {
                        return {
                          ...prevData,
                          otherRooms: newSelectedOtherRooms,
                        };
                      });
                      return;
                    } else {
                      const newSelectedOtherRooms = [
                        ...selectedOtherRooms,
                        room,
                      ];
                      setSelectedOtherRooms(newSelectedOtherRooms);
                      setData((prevData) => {
                        return {
                          ...prevData,
                          otherRooms: newSelectedOtherRooms,
                        };
                      });
                      return;
                    }
                  }}
                  className={` capitalize  px-3 py-1 rounded-full ${
                    selectedOtherRooms.some((item) => item == room)
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "text-slate-900 bg-[#f4f5f7]"
                  } `}
                  key={index}
                >
                  {room}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* pg rooms */}

      {selectedLookingTo == 2 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl capitalize">
            pg rooms <span className="text-sm"></span>
          </h1>

          <div className="flex gap-4">
            {pgRoomType.map((room, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedPgRoomType(room);
                    if (room == "private") {
                      if (data?.sharingPeopleCount)
                        delete data.sharingPeopleCount;
                    }
                    setData((prevData) => {
                      return {
                        ...prevData,
                        pgRoomType: room,
                      };
                    });
                  }}
                  className={` capitalize  px-3 py-1 rounded-full  ${
                    room == selectedPgRoomType
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "text-slate-900 bg-[#f4f5f7]"
                  }`}
                  key={index}
                >
                  {room}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {selectedPgRoomType == "sharing" &&
        selectedLookingTo == 2 &&
        selectedPropertyCategory == 0 && (
          <div className="flex flex-col gap-4">
            {/* pg sharing */}
            <h1 className="text-2xl capitalize">
              Sharing People Count <span className="text-sm"></span>
            </h1>

            <div className="flex gap-4">
              {sharingPeopleCount.map((count, index) => {
                return (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      setSelectedSharingPeopleCount(count);
                      setData((prevData) => {
                        return {
                          ...prevData,
                          sharingPeopleCount: count,
                        };
                      });
                    }}
                    className={` capitalize  px-3 py-1 rounded-full ${
                      count == selectedSharingPeopleCount
                        ? "bg-[#396d8c] text-[#f4f5f7]"
                        : "bg-[#f4f5f7] text-slate-900"
                    }`}
                    key={index}
                  >
                    {count}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      {/* pg capacity */}

      {selectedLookingTo == 2 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl capitalize flex items-center gap-2">
            Pg Room Capacity <span className="text-[1rem]">(optional)</span>
          </h1>

          <div className="flex gap-4">
            <motion.input
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              min={1}
              max={20}
              className="px-3 w-52 py-2 text-xl outline-none bg-transparent border-2   rounded-md"
              type="number"
              placeholder="No.of beds in PG"
              value={selectedPgCapacity}
              onChange={(e) => {
                setSelectedPgCapacity(e.target.value);
              }}
            />
          </div>
        </div>
      )}

      {/* pg room info  */}
      {selectedLookingTo == 2 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl capitalize flex items-center gap-2">
            Pg Room Info <span className="text-[1rem]">(optional)</span>
          </h1>

          <div className="flex gap-4">
            {pgRoomInfo.map((info, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    if (selectedPgInfo.some((item) => item == info)) {
                      const newSelectedPgInfo = selectedPgInfo.filter(
                        (item) => item != info
                      );
                      setSelectedPgInfo(newSelectedPgInfo);
                      setData((prevData) => {
                        return {
                          ...prevData,
                          pgInfo: newSelectedPgInfo,
                        };
                      });
                    } else {
                      const newSelectedPgInfo = [...selectedPgInfo, info];

                      setSelectedPgInfo(newSelectedPgInfo);
                      setData((prevData) => {
                        return {
                          ...prevData,
                          pgInfo: newSelectedPgInfo,
                        };
                      });
                    }
                  }}
                  className={` capitalize  px-3 py-1 rounded-full  ${
                    selectedPgInfo.some((item) => item == info)
                      ? " bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  } `}
                  key={index}
                >
                  {info}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {selectedLookingTo == 2 && (
        <div className="flex flex-col gap-4">
          {/* pg available for  */}
          <h1 className="text-2xl capitalize">
            Pg available for <span className="text-sm"></span>
          </h1>

          <div className="flex gap-4">
            {pgAvailableFor.map((availableFor, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedPgAvailableFor(availableFor);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        pgAvailableFor: availableFor,
                      };
                    });
                  }}
                  className={` capitalize  px-3 py-1 rounded-full ${
                    selectedPgAvailableFor == availableFor
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  }`}
                  key={index}
                >
                  {availableFor}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* pg suitable for */}

      {selectedLookingTo == 2 && (
        <div className="flex flex-col gap-4">
          {/*pg suitable for */}
          <h1 className="text-2xl capitalize">
            Pg suitable for <span className="text-sm"></span>
          </h1>

          <div className="flex gap-4">
            {pgSuitableFor.map((suitableFor, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedPgSuitableFor(suitableFor);
                  }}
                  className={` capitalize  px-3 py-1 rounded-full ${
                    selectedPgSuitableFor == suitableFor
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  }`}
                  key={index}
                >
                  {suitableFor}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {selectedPropertyType !== 5 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4">
          {/* furnishing status */}

          <h1 className="text-2xl capitalize ">Furnishing</h1>

          <div className="flex gap-4">
            {furnishingStatus.map((status, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    if (index == 0 || index == 1) {
                      setIsFurnished(true);
                    } else {
                      setIsFurnished(false);
                    }
                    setSelectedFurnishingStatus(status);
                  }}
                  className={` ${
                    selectedFurnishingStatus == status
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  } capitalize  px-3 py-1 rounded-full `}
                  key={index}
                >
                  {status}
                </motion.button>
              );
            })}
          </div>

          {isFurnished && (
            <div className="border-2 border-gray-400 rounded-xl my-4 p-4  flex flex-col gap-4 flex-wrap w-[50%]">
              {/* furnishing information  */}
              <div className="flex items-center  gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  disabled={light == 0 ? true : false}
                  onClick={() => {
                    setLight(light - 1);
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  -
                </motion.button>
                <h1>{light}</h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setLight(light + 1);
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  +
                </motion.button>
                <h1 className="text-xl capitalize ">Light</h1>
              </div>

              <div className="flex items-center  gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  disabled={Fans == 0 ? true : false}
                  onClick={() => {
                    setFans(Fans - 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans: Fans - 1 },
                          { geyser },
                          { wardrobe },
                          { AC },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  -
                </motion.button>
                <h1>{Fans}</h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setFans(Fans + 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans: Fans + 1 },
                          { geyser },
                          { wardrobe },
                          { AC },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  +
                </motion.button>
                <h1 className="text-xl capitalize ">Fans</h1>
              </div>

              <div className="flex items-center  gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  disabled={AC == 0 ? true : false}
                  onClick={() => {
                    setAC(AC - 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans },
                          { geyser },
                          { wardrobe },
                          { AC: AC - 1 },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  -
                </motion.button>
                <h1>{AC}</h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setAC(AC + 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans },
                          { geyser },
                          { wardrobe },
                          { AC: AC + 1 },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  +
                </motion.button>
                <h1 className="text-xl capitalize ">AC</h1>
              </div>

              <div className="flex items-center  gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  disabled={wardrobe == 0 ? true : false}
                  onClick={() => {
                    setWardrobe(wardrobe - 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans },
                          { geyser },
                          { wardrobe: wardrobe - 1 },
                          { AC },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  -
                </motion.button>
                <h1>{wardrobe}</h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setWardrobe(wardrobe + 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans },
                          { geyser },
                          { wardrobe: wardrobe + 1 },
                          { AC },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  +
                </motion.button>
                <h1 className="text-xl capitalize ">wardrobe</h1>
              </div>

              <div className="flex items-center  gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  disabled={geyser == 0 ? true : false}
                  onClick={() => {
                    setGeyser(geyser - 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans },
                          { geyser: geyser - 1 },
                          { wardrobe },
                          { AC },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  -
                </motion.button>
                <h1>{geyser}</h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setGeyser(geyser + 1);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        furnishingDetails: [
                          { light },
                          { Fans },
                          { geyser: geyser + 1 },
                          { wardrobe },
                          { AC },
                        ],
                        otherFurnishingDetails: selectedFurnishingDetails,
                      };
                    });
                  }}
                  className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
                >
                  +
                </motion.button>
                <h1 className="text-xl capitalize ">geyser</h1>
              </div>

              <div className="flex gap-4 flex-wrap ">
                {furnishingDetails.map((details, index) => {
                  return (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        if (
                          selectedFurnishingDetails.some(
                            (item, index) => item == details
                          )
                        ) {
                          const newSelectedFurnishingDetails =
                            selectedFurnishingDetails.filter(
                              (item) => item != details
                            );
                          setSelectedFurnishingDetails(
                            newSelectedFurnishingDetails
                          );
                          setData((prevData) => {
                            return {
                              ...prevData,
                              furnishingDetails: [
                                { light },
                                { Fans },
                                { geyser: geyser + 1 },
                                { wardrobe },
                                { AC },
                              ],
                              otherFurnishingDetails: selectedFurnishingDetails,
                            };
                          });
                        } else {
                          const newSelectedFurnishingDetails = [
                            ...selectedFurnishingDetails,
                            details,
                          ];
                          setSelectedFurnishingDetails(
                            newSelectedFurnishingDetails
                          );
                          setData((prevData) => {
                            return {
                              ...prevData,
                              furnishingDetails: [
                                { light },
                                { Fans },
                                { geyser: geyser + 1 },
                                { wardrobe },
                                { AC },
                              ],
                              otherFurnishingDetails: selectedFurnishingDetails,
                            };
                          });
                        }
                      }}
                      className={` capitalize  px-3 py-1 rounded-full ${
                        selectedFurnishingDetails.some(
                          (item) => item == details
                        )
                          ? "bg-[#396d8c] text-[#f4f5f7]"
                          : "bg-[#f4f5f7] text-slate-900"
                      }`}
                      key={index}
                    >
                      {details}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedPropertyType !== 5 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4 ">
          {/* parking */}
          <h1 className="capitalize text-2xl ">Parking Space</h1>

          <div className="flex items-center  gap-3">
            {
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                disabled={coveredParkingSpace == 0 ? true : false}
                onClick={() => {
                  setCoveredParkingSpace(coveredParkingSpace - 1);
                  setData((data) => {
                    return {
                      ...data,
                      coveredParking: coveredParkingSpace - 1,
                    };
                  });
                }}
                className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
              >
                -
              </motion.button>
            }
            <h1>{coveredParkingSpace}</h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                setCoveredParkingSpace(coveredParkingSpace + 1);
                setData((data) => {
                  return {
                    ...data,
                    coveredParking: coveredParkingSpace + 1,
                  };
                });
              }}
              className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
            >
              +
            </motion.button>
            <h1 className="text-xl capitalize ">Covered parking Space</h1>
          </div>

          <div className="flex items-center  gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              disabled={openParkingSpace == 0 ? true : false}
              onClick={() => {
                setOpenParkingSpace(openParkingSpace - 1);
                setData((data) => {
                  return {
                    ...data,
                    openParking: openParkingSpace - 1,
                  };
                });
              }}
              className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
            >
              -
            </motion.button>
            <h1>{openParkingSpace}</h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                setOpenParkingSpace(openParkingSpace + 1);
                setData((data) => {
                  return {
                    ...data,
                    openParking: openParkingSpace + 1,
                  };
                });
              }}
              className="w-8 h-8 items-center flex justify-center rounded-full bg-[#f4f5f7] text-slate-900 "
            >
              +
            </motion.button>
            <h1 className="text-xl capitalize ">open parking Space</h1>
          </div>
        </div>
      )}

      {selectedPropertyType !== 5 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4 self-start">
          {/* floor details */}
          <h1>Floor Details</h1>

          <div className="flex flex-wrap gap-4">
            <motion.input
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onChange={(e) => {
                setSelectedTotalFloor(Number(e.target.value));
                setData((data) => {
                  return {
                    ...data,
                    totalFloors: Number(e.target.value),
                  };
                });
              }}
              min={1}
              max={20}
              className="px-3 py-2 text-xl w-48 outline-none bg-transparent border-2  rounded-md  "
              type="number"
              value={selectedTotalFloors}
              placeholder="Total Floors"
            />

            {selectedPropertyType !== 2 && selectedPropertyType != 6 && (
              <select
                value={selectedFloorNumber}
                onChange={(e) => {
                  setSelectedFloorNumber(e.target.value);
                  setData((data) => {
                    return {
                      ...data,
                      floorNumber: e.target.value,
                    };
                  });
                }}
                className="p-2 text-xl  outline-none bg-transparent border-2  rounded-md  "
              >
                {propertyOnFloor.map((floor, index) => {
                  return (
                    <option value={floor} key={index}>
                      {floor}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </div>
      )}

      {selectedPropertyType !== 5 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4">
          {/* availability status */}
          <h1 className="capitalize text-2xl  ">availability status</h1>
          <div className="flex gap-4">
            {availabilityStatus.map((status, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedAvailabiltyStatus(index);
                  }}
                  className={` ${
                    selectedAvailabilityStatus == index
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "text-slate-900 bg-[#f4f5f7]"
                  }  capitalize  px-3 py-1 rounded-full `}
                  key={index}
                >
                  {status}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
      {selectedAvailabilityStatus == 0 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col gap-4 ">
          {/* property age  */}
          <h1 className="text-2xl capitalize ">Age of Property</h1>
          <div className="flex gap-4">
            {ageOfProperty.map((age, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedPropertyAge(age);
                  }}
                  className={`capitalize  px-3 py-1 rounded-full ${
                    selectedPropertyAge == age
                      ? "bg-[#396d8c] text-[#f4f5f7] "
                      : "text-slate-900 bg-[#f4f5f7]"
                  }  `}
                  key={index}
                >
                  {age} years
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
      {/* possesion in  */}
      {selectedAvailabilityStatus == 1 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col  flex-wrap gap-4">
          <h1 className="text-2xl capitalize ">Possesion In</h1>
          <div className="flex flex-wrap gap-4 ">
            {possesionIn.map((possesionin, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedPossessionIn(possesionin);
                  }}
                  className={` ${
                    selectedPossessionIn == possesionin
                      ? "bg-[#396d8c] text-[#f4f5f7] "
                      : "text-slate-900 bg-[#f4f5f7]"
                  }     px-3 py-1 rounded-full  `}
                  key={index}
                >
                  {possesionin}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
      {/* available from  */}

      {(selectedLookingTo === 1 || selectedLookingTo == 2) &&
        selectedPropertyCategory == 0 && (
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-2xl capitalize">Available From</h1>
            <motion.input
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-2 self-start text-xl outline-none bg-transparent border-2  rounded-md  "
              onChange={(e) => {
                setSelectedAvailableFrom(e.target.value);
                setData((prevData) => {
                  return {
                    ...prevData,
                    availableFrom: e.target.value,
                  };
                });
              }}
              value={selectedAvailableFrom}
              type="date"
              name="date"
            />
          </div>
        )}

      {/* rent out to  */}
      {selectedLookingTo == 1 && selectedPropertyCategory == 0 && (
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl capitalize">Rent out to</h1>
          <div className="flex gap-4">
            {rentOutTo.map((person, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedRentOutTo(person);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        rentOutTo: person,
                      };
                    });
                  }}
                  className={` capitalize  px-3 py-1 rounded-full ${
                    selectedRentOutTo == person
                      ? "bg-[#396d8c] text-[#f4f5f7] "
                      : "text-slate-900 bg-[#f4f5f7]"
                  }`}
                  key={index}
                >
                  {person}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* plot area */}

      {(selectedPropertyType == 5 || selectedCommercialProperties == 0) && (
        <div className="flex gap-4 flex-col items-start ">
          <h1 className="text-2xl capitalize">Add area details</h1>
          <motion.input
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md w-48 "
            min={0}
            max={1000000}
            type="number"
            placeholder="Plot Area in sq"
            value={selectedPlotArea}
            onChange={(e) => {
              setSelectedPlotArea(e.target.value);
              setData((prevData) => {
                return {
                  ...prevData,
                  plotArea: Number(e.target.value),
                };
              });
            }}
          />
        </div>
      )}

      {/* floors allowed for contruction  */}

      {(selectedPropertyType == 5 || selectedCommercialProperties == 0) && (
        <div className="flex gap-4 flex-col items-start ">
          <h1 className="text-2xl capitalize">
            Floors allowed For construction
          </h1>
          <motion.input
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            min={1}
            max={22}
            className="px-3 py-2 text-xl w-1/4 outline-none bg-transparent border-2  rounded-md  "
            type="number"
            placeholder="No of Floors"
            value={selectedAllowedFloors}
            onChange={(e) => {
              setSelectedAllowedFloor(e.target.value);
              setData((prevData) => {
                return {
                  ...prevData,
                  noOfAllowedFloorConstruction: Number(e.target.value),
                };
              });
            }}
          />
        </div>
      )}

      {/* boundary wall  */}

      {(selectedPropertyType == 5 || selectedCommercialProperties == 0) && (
        <div className="flex gap-4 flex-col items-start ">
          <h1 className="text-2xl capitalize">
            is there any boundary wall around the property ?{" "}
          </h1>
          <div className="flex gap-4 flex-wrap">
            {plotboundaryWall.map((boundary, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedBoundaryWall(boundary);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        isBoundaryWall: boundary,
                      };
                    });
                  }}
                  className={` capitalize  px-3 py-1 rounded-full  ${
                    selectedBoundaryWall == boundary
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  } `}
                  key={index}
                >
                  {boundary}{" "}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* open sides */}

      {(selectedPropertyType == 5 || selectedCommercialProperties == 0) && (
        <div className="flex gap-4 flex-col items-start ">
          <h1 className="text-2xl capitalize">No of open sides </h1>
          <div className="flex gap-4 flex-wrap">
            {plotopenSides.map((openSides, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedNoOfOpenSides(openSides);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        NoOfOpenSides: openSides,
                      };
                    });
                  }}
                  className={`${
                    selectedNoOfOpenSides == openSides
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  } capitalize  px-3 py-1 rounded-full`}
                  key={index}
                >
                  {openSides}{" "}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* any construction done on the plot */}

      {(selectedPropertyType == 5 || selectedCommercialProperties == 0) && (
        <div className="flex gap-4 flex-col items-start ">
          <h1 className="text-2xl capitalize">
            any construction done on the plot ?{" "}
          </h1>
          <div className="flex gap-4 flex-wrap">
            {plotContruction.map((isContructionDone, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedContructionDone(isContructionDone);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        isConstructionDone: isContructionDone,
                      };
                    });
                  }}
                  className={`capitalize  px-3 py-1 rounded-full ${
                    selectedConstructionDone == isContructionDone
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : " bg-[#f4f5f7]  text-slate-900"
                  }  `}
                  key={index}
                >
                  {isContructionDone}{" "}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      <ContinueBtn handlerFunc={handleFunctionOnContinue} />
    </motion.div>
  );
};

export default AboutProperty;
