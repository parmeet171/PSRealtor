import React, { useContext, useState } from "react";
import ContinueBtn from "./ContinueBtn";
import Back from "./Back";
import { propertyContext } from "../context/RealEstateContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
const PricingDetails = () => {
  const {
    pricepersqft , serPricePerSqFt , 
    selectedLookingTo,
    rentInfoPrice,
    rentPrice,
    noticeMonths,
    durationOfAgreement,
    foodDetails,
    mealType,
    availableMealsTiming,
    chargesForFood,
    data,
    setData,
    selectedRentPrice,
    setSelectedRentPrice,
    selectedRentInfoPrice,
    setSelectedRentInfoPrice,
    selectedDurationOfAgreement,
    setSelectedDurationOfAgreement,
    selectedNoticeMonths,
    setSelectedNoticeMonths,
    selectedSecurityDeposit,
    setSelectedSecurityDeposit,

    selectedPgFoodDetails,
    setSelectedPgFoodDetails,
    selectedPgMealType,
    setSelectedPgMealType,
    selectedAvailableMealsTiming,
    setSelectedAvailableMealsTiming,
    selectedChargesForFood,
    setSelectedChargesForFood,
    selectedPropertyCategory,
    selectedCommercialProperties,
    selectedPropertyType,
    selectedPrice,
    setSelectedPrice,
    isFoodAvailable,
    setIsFoodAvailable,
    houseRules,
    setHouseRules,
    carpetArea, 
    builtUpArea ,
    superBuiltUpArea ,
  } = useContext(propertyContext);
  const onChangePriceHandler = (e) => {
    setSelectedPrice(Number(e.target.value));
    const price  = e.target.value ; 
    setData((data) => {
      return {
        ...data,
        price: Number(e.target.value),
      };
    });
    if(carpetArea !== "")
    {
      serPricePerSqFt(price/carpetArea) ; 

    }
    else if(builtUpArea !== "")
    {
      serPricePerSqFt(price/carpetArea) ; 
    }
    else if(superBuiltUpArea !== "")
    {
      serPricePerSqFt(price/carpetArea) ; 
    }
  }

  const handleFunctionOnContinue = async () => {
    if (
      selectedLookingTo == 0 &&
      (selectedPropertyCategory == 0 || selectedPropertyCategory == 1)
    ) {
      if (selectedPrice == "") {
        toast.error("Please fill the price  property");
        return false;
      }
    }
    if (
      selectedLookingTo == 1 &&
      (selectedPropertyCategory == 0 || selectedPropertyCategory == 1)
    ) {
      if (selectedRentPrice == "") {
        toast.error("Plese fill the rent field");
        return false;
      }
      if (houseRules !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            houseRules,
          };
        });
      }
    }

    if (selectedLookingTo == 2 && selectedPropertyCategory == 0) {
      if (selectedRentPrice == "") {
        toast.error("Please fill the pg rent  field");
        return false;
      }
      if (selectedPgFoodDetails === -1) {
        toast.error("Please provide food details");
        return false;
      } else {
        if (selectedPgFoodDetails == 0) {
          setData((prevData) => {
            return {
              ...prevData,
              food: "available",
            };
          });
          if (selectedPgMealType?.length == 0) {
            toast.error("Please select meal type");
            return false;
          } else {
            setData((prevData) => {
              return {
                ...prevData,
                mealType: selectedPgMealType,
              };
            });
          }

          // MEAL TIMING
          if (selectedAvailableMealsTiming.length == 0) {
            toast.error("Please provide meals timing details");
            return false;
          } else {
            setData((prevData) => {
              return {
                ...prevData,
                mealTimings: selectedAvailableMealsTiming,
              };
            });
          }

          // charges for food
          if (selectedChargesForFood == "") {
            toast.error("Please fill field charges for food");
            return false;
          }
        } else {

          setData((prevData) => {
            return {
              ...prevData,
              food: "not available",
            };
          });
        }
      }

      if (houseRules !== "") {
        setData((prevData) => {
          return {
            ...prevData,
            houseRules,
          };
        });
      }
    }
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "300px" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "300px" }}
      transition={{ duration: 1, ease: "easeInOut", duration: 0.5 }}
      className="text-[#f4f5f7] box-shadow flex flex-col gap-6 h-[70vh] overflow-y-scroll p-10 "
    >
      <Back />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl capitalize">Add Pricing Details ...</h1>
        {selectedLookingTo == 0 && (
          <h2 className="text-2xl capitalize">Price details</h2>
        )}
        {selectedLookingTo == 0 && (
          <div className="flex gap-4">
            <motion.input
             whileTap={{ scale: 1 }}
             whileHover={{ scale: 1.009 }}
              min={0}
              max={1000000000}
              value={selectedPrice}
              onChange={onChangePriceHandler}
              className="px-3 py-2 w-48 text-xl outline-none bg-transparent border-2  rounded-md  "
              type="number"
              placeholder="Expected price"
            />

            <motion.input
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1.009 }}
              className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
              readOnly
              type="number"
              value = {pricepersqft} 
              placeholder="Price per sq ft"
            />
          </div>
        )}

        {/* rent details  */}

        <div className="flex flex-col gap-4 ">
          {(selectedLookingTo == 1 || selectedLookingTo == 2) && (
            <h2 className="text-2xl capitalize flex gap-2 items-center ">Rent details 
            {selectedLookingTo == 1 && <span className="capitalize text-[1rem]">(per month)</span>} 
            {selectedLookingTo == 2 && <span className="capitalize text-[1rem]">(per bed)</span>} 

             
             </h2>
          )}

          {(selectedLookingTo == 1 || selectedLookingTo == 2) && (
            <div className="">
              <motion.input
               whileTap={{ scale: 1 }}
               whileHover={{ scale: 1.009 }}
                value={selectedRentPrice}
                onChange={(e) => {
                  setSelectedRentPrice(e.target.value);
                  setData((prevData) => {
                    return {
                      ...prevData,
                      rent: Number(e.target.value),
                    };
                  });
                }}
                className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
                type="number"
                placeholder="Expected Rent "
              />
            </div>
          )}
        </div>
        {/* food details */}

        {selectedLookingTo == 2 && (
          <div className="flex flex-col   gap-4   ">
            <h1 className="text-2xl capitalize ">Food details</h1>
            <div className="flex gap-4 ">
              {foodDetails.map((details, index) => {
                return (
                  <motion.button
                  whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                    onClick={() => {
                      if (index == 0) {
                        setIsFoodAvailable(true);
                      } else {
                        setIsFoodAvailable(false);
                      }
                      setSelectedPgFoodDetails(index);

                
                    }}
                    className={`${" capitalize "}     px-3 py-1 rounded-full ${
                      selectedPgFoodDetails == index
                        ? "bg-[#396d8c] text-[#f4f5f7]"
                        : "text-slate-900 bg-[#f4f5f7]"
                    } `}
                    key={index}
                  >
                    {details}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* meal type */}

        {isFoodAvailable && selectedLookingTo == 2 && (
          <div className="flex flex-col   gap-4   ">
            <h1 className="text-2xl capitalize ">meal Type </h1>
            <div className="flex gap-4 ">
              {mealType.map((type, index) => {
                return (
                  <motion.button
                  whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                    onClick={() => {
                      if (selectedPgMealType?.some((item) => item == type)) {
                        const newSelectedPgMealType = selectedPgMealType?.filter(
                          (item) => item != type
                        );
                        setSelectedPgMealType(newSelectedPgMealType);
                      } else {
                        const newSelectedPgMealType = [
                          ...selectedPgMealType,
                          type,
                        ];
                        setSelectedPgMealType(newSelectedPgMealType);
                      }
                    }}
                    className={` ${
                      selectedPgMealType?.some((item) => item == type)
                        ? "bg-[#396d8c] text-[#f4f5f7]"
                        : "bg-[#f4f5f7] capitalize text-slate-900"
                    }     px-3 py-1 rounded-full  `}
                    key={index}
                  >
                    {type}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* availableMealsTiming */}
        {isFoodAvailable && selectedLookingTo == 2 && (
          <div className="flex flex-col   gap-4   ">
            <h1 className="text-2xl capitalize ">available Meals Timing</h1>
            <div className="flex gap-4 ">
              {availableMealsTiming.map((timings, index) => {
                return (
                  <motion.button
                  whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                    onClick={() => {
                      if (
                        selectedAvailableMealsTiming.some(
                          (item) => item == timings
                        )
                      ) {
                        const newSelectedAvailableMealsTimings =
                          selectedAvailableMealsTiming.filter(
                            (item) => item != timings
                          );
                        setSelectedAvailableMealsTiming(
                          newSelectedAvailableMealsTimings
                        );
                        setData((prevData) => {
                          return {
                            ...prevData,
                            mealTimings: newSelectedAvailableMealsTimings,
                          };
                        });
                      } else {
                        const newSelectedAvailableMealsTimings = [
                          ...selectedAvailableMealsTiming,
                          timings,
                        ];
                        setSelectedAvailableMealsTiming(
                          newSelectedAvailableMealsTimings
                        );
                      }
                    }}
                    className={` ${
                      selectedAvailableMealsTiming.some(
                        (item) => item == timings
                      )
                        ? "bg-[#396d8c] text-[#f4f5f7]"
                        : "bg-[#f4f5f7] capitalize text-slate-900"
                    }     px-3 py-1 rounded-full  `}
                    key={index}
                  >
                    {timings}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* charges for food */}

        {isFoodAvailable && selectedLookingTo == 2 && (
          <div className="flex flex-col   gap-4   ">
            <h1 className="text-2xl capitalize ">charges For Food</h1>
            <div className="flex gap-4 ">
              {chargesForFood.map((charges, index) => {
                return (
                  <motion.button
                  whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                    onClick={() => {
                      setSelectedChargesForFood(charges);
                      setData((prevData) => {
                        return {
                          ...prevData,
                          foodCharges: charges,
                        };
                      });
                    }}
                    className={`    px-3 py-1 rounded-full ${
                      selectedChargesForFood == charges
                        ? "bg-[#396d8c] text-[#f4f5f7]"
                        : "bg-[#f4f5f7] capitalize text-slate-900"
                    } `}
                    key={index}
                  >
                    {charges}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* rent info  */}
        {selectedLookingTo == 1 && (
          <div className="flex gap-4 items-center ">
            {rentInfoPrice.map((info, index) => {
              return (
                <motion.button
                whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                  onClick={() => {
                    setSelectedRentInfoPrice(info);
                    setData((prevData) => {
                      return {
                        ...prevData,
                        rentInfo: info,
                      };
                    });
                  }}
                  className={`    px-3 py-1 rounded-full ${
                    selectedRentInfoPrice == info
                      ? "bg-[#396d8c] text-[#f4f5f7]"
                      : "bg-[#f4f5f7] text-slate-900"
                  }  `}
                  key={index}
                >
                  {info}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* security deposit */}
        {(selectedLookingTo == 1 || selectedLookingTo == 2) &&
          selectedCommercialProperties !== 0 && (
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-2xl capitalize ">
                Security deposit{" "}
                <span className="text-sm capitalize ml-1">(optional)</span>
              </h1>
              <input
                type="number"
                value={selectedSecurityDeposit}
                onChange={(e) => {
                  setSelectedSecurityDeposit(e.target.value);
                  setData((prevData) => {
                    return {
                      ...prevData,
                      securityDeposit: Number(e.target.value),
                    };
                  });
                }}
                className="px-3 py-2 text-xl outline-none bg-transparent border-2  rounded-md  "
                placeholder="Deposit Value"
              />
            </div>
          )}

        {/* Duration of agreement */}

        {(selectedLookingTo == 1 || selectedLookingTo == 2) && (
          <div className="flex flex-col gap-4 items-start ">
            <h1 className="text-2xl capitalize ">
              Duration of agreement{" "}
              <span className="text-sm capitalize ml-1">(optional)</span>
            </h1>
            <select
              value={selectedDurationOfAgreement}
              onChange={(e) => {
                setSelectedDurationOfAgreement(e.target.value);
                setData((prevData) => {
                  return {
                    ...prevData,
                    durationOfAgreement: Number(e.target.value),
                  };
                });
              }}
              className="p-2 text-xl  outline-none bg-transparent border-2  rounded-md  "
            >
              {durationOfAgreement.map((duration, index) => {
                return (
                  <option value={duration} key={index}>
                    {duration} months
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {/* months of notice */}

        {(selectedLookingTo == 1 || selectedLookingTo == 2) &&
          selectedPropertyCategory == 0 && (
            <div className="flex flex-col gap-4 ">
              <h1 className="text-2xl capitalize ">
                Months of notice{" "}
                <span className="text-sm capitalize ml-1">(optional)</span>
              </h1>

              <div className="flex gap-4 flex-wrap">
                {noticeMonths.map((month, index) => {
                  return (
                    <motion.button
                    whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                      onClick={() => {
                        setSelectedNoticeMonths(month);
                        setData((prevData) => {
                          return {
                            ...prevData,
                            noticeMonths: month,
                          };
                        });
                      }}
                      className={`  ${
                        selectedNoticeMonths == month
                          ? "bg-[#396d8c] text-[#f4f5f7]"
                          : "bg-[#f4f5f7] text-slate-900"
                      }    px-3 py-1 rounded-full  `}
                      key={index}
                    >
                      {month}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

        {(selectedLookingTo == 2 || selectedLookingTo == 1) &&
          selectedPropertyCategory == 0 && (
            <div className="flex flex-col gap-4 ">
              <h1 className="text-2xl capitalize">
                Have any house rule ?{" "}
                <span className="text-sm capitalize ml-1">(optional)</span>{" "}
              </h1>
              <textarea
                onChange={(e) => {
                  setHouseRules(e.target.value);
                }}
                value={houseRules}
                className="p-3 text-xl border-2 bg-transparent outline-none w-1/2 "
                rows="5"
                cols="5"
                placeholder="Enter your house rules that guest should follow"
              ></textarea>
            </div>
          )}

        <ContinueBtn handlerFunc={handleFunctionOnContinue} />
      </div>
    </motion.div>
  );
};

export default PricingDetails;
