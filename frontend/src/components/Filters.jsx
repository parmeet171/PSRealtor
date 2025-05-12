import React, { useState, useContext, useMemo, useEffect } from "react";
import { propertyContext } from "../context/RealEstateContext";

const PropertyType = () => {
  const {
    propertyType,
    CommercialProperties,
    filteredPropertyCategory,
    filteredPropertyType,
    setFilteredPropertyType,
    filteredPropertyFor,
  } = useContext(propertyContext);
  useEffect(() => {
    console.log(filteredPropertyType);
  }, [filteredPropertyType]);
  return (
    <div className="flex gap-4 p-4  flex-col  ">
      <div className="capitalize ">Property Type</div>
      <div className="flex gap-4 flex-wrap">
        {filteredPropertyCategory == "residential" &&
          propertyType.map((ptype, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  if (!filteredPropertyType.some((type) => ptype == type)) {
                    setFilteredPropertyType((prevData) => {
                      return [...prevData, ptype];
                    });
                  } else {
                    const newSelectedPropertyType = filteredPropertyType.filter(
                      (type) => ptype != type
                    );
                    setFilteredPropertyType(newSelectedPropertyType);
                  }
                }}
                className={`${
                  filteredPropertyType.some((item) => item == "Plot/Land") &&
                  idx !== 5
                    ? "hidden"
                    : "block"
                } px-2 py-1 border-2  rounded-full ${
                  filteredPropertyType.some((type) => ptype == type)
                    ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                    : ""
                } ${
                  (filteredPropertyFor == "Rent" ||
                    filteredPropertyFor == "PG") &&
                  ptype == "Plot/Land"
                    ? "hidden"
                    : "block"
                }`}
              >
                {ptype}
              </button>
            );
          })}
        {filteredPropertyCategory == "commercial" &&
          CommercialProperties.map((ptype, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  if (!filteredPropertyType.some((type) => type == ptype)) {
                    setFilteredPropertyType((prevData) => {
                      return [...prevData, ptype];
                    });
                  } else {
                    const newSelectedPropertyType = filteredPropertyType.filter(
                      (type) => type != ptype
                    );
                    setFilteredPropertyType(newSelectedPropertyType);
                  }
                }}
                className={`px-2 py-1 border-2  rounded-full ${
                  filteredPropertyType.some((type) => type == ptype)
                    ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                    : ""
                }`}
              >
                {ptype}
              </button>
            );
          })}
      </div>
    </div>
  );
};

//
const PostedBy = () => {
  const { postedBy, filteredPostedBy, setFilteredPostedBy } =
    useContext(propertyContext);
  useEffect(() => {
    console.log(filteredPostedBy);
  }, [filteredPostedBy]);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="capitalize ">posted By</div>
      <div className="flex gap-4 ">
        {postedBy.map((postedby, idx) => {
          return (
            <button
              onClick={() => {
                if (!filteredPostedBy.some((by) => by == postedby)) {
                  setFilteredPostedBy((prevData) => {
                    return [...prevData, postedby];
                  });
                } else {
                  console.log("deleting element");
                  const newPostedBy = filteredPostedBy.filter(
                    (by) => by != postedby
                  );
                  setFilteredPostedBy(newPostedBy);
                }
              }}
              className={`px-2 py-1 border-2 ${
                filteredPostedBy.some((by) => by == postedby)
                  ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                  : ""
              }  rounded-full`}
              key={idx}
            >
              {postedby}
            </button>
          );
        })}
      </div>
    </div>
  );
};
const ContructionStatus = () => {
  const {
    constructionStatus,
    filteredContructionStatus,
    setFilteredConstructionStatus,
  } = useContext(propertyContext);

  useEffect(() => {
    console.log(filteredContructionStatus);
  }, [filteredContructionStatus]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="capitalize ">{`Contruction Status `}</div>
      <div className="flex gap-4 ">
        {constructionStatus.map((status, idx) => {
          return (
            <button
              onClick={() => {
                setFilteredConstructionStatus(status);
              }}
              className={`px-2 py-1 border-2 rounded-full ${
                filteredContructionStatus == status
                  ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                  : ""
              }`}
              key={idx}
            >
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Bedroom = () => {
  const { bedroom, filteredBedrooms, setFilteredBedrooms } =
    useContext(propertyContext);
  useEffect(() => {
    console.log(filteredBedrooms);
  }, [filteredBedrooms]);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="capitalize ">Bedroom</div>
      <div className="flex gap-4 ">
        {bedroom.map((rooms, idx) => {
          return (
            <button
              onClick={() => {
                setFilteredBedrooms(rooms);
              }}
              className={`px-2 py-1 border-2 rounded-full ${
                filteredBedrooms == rooms
                  ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                  : ""
              }`}
              key={idx}
            >{`${rooms} BHK`}</button>
          );
        })}
      </div>
    </div>
  );
};

const Sharing = () => {
  const {
    sharingPeopleCount,
    filteredSharingCount,
    filteredPropertyFor,
    setFilteredSharingCount,
  } = useContext(propertyContext);

  useEffect(() => {
    console.log(filteredSharingCount);
  }, [filteredSharingCount]);

  return (
    <>
      {filteredPropertyFor === "PG" && (
        <div className="flex flex-col gap-4 p-4">
          <div className="capitalize ">Sharing</div>
          <div className="flex gap-4 ">
            {sharingPeopleCount.map((sharing, idx) => {
              return (
                <button
                  onClick={() => {
                    setFilteredSharingCount(sharing);
                  }}
                  className={`px-2 py-1 border-2 rounded-full ${
                    filteredSharingCount == sharing
                      ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                      : ""
                  }`}
                  key={idx}
                >{`${sharing} person`}</button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const AvailableFor = () => {
  const {
    pgAvailableFor,
    filteredAvailableFor,
    filteredPropertyFor,
    setFilteredAvailableFor,
  } = useContext(propertyContext);

  useEffect(() => {
    console.log(filteredAvailableFor);
  }, [filteredAvailableFor]);
  return (
    <>
      {filteredPropertyFor == "PG" && (
        <div className="flex flex-col gap-4 p-4">
          <div className="capitalize "> PG Available for</div>
          <div className="flex gap-4 ">
            {pgAvailableFor.map((availablefor, idx) => {
              return (
                <button
                  onClick={() => {
                    setFilteredAvailableFor(availablefor);
                  }}
                  className={`px-2 py-1 border-2 rounded-full capitalize  ${
                    filteredAvailableFor == availablefor
                      ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                      : ""
                  }`}
                  key={idx}
                >{`${availablefor} `}</button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const Furnishing = () => {
  const {
    furnishingStatus,
    filteredFurnishingStatus,
    setFilteredFurnishingStatus,
  } = useContext(propertyContext);
  useEffect(() => {
    console.log(filteredFurnishingStatus);
  }, [filteredFurnishingStatus]);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="capitalize ">Furnishing</div>
      <div className="flex gap-4 ">
        {furnishingStatus.map((furnishing, idx) => {
          return (
            <button
              onClick={() => {
                setFilteredFurnishingStatus(furnishing);
              }}
              className={`px-2 py-1 border-2 rounded-full ${
                filteredFurnishingStatus == furnishing
                  ? "bg-[#396d8c] border-2 border-[#396d8c] text-gray-200"
                  : ""
              }`}
              key={idx}
            >{`${furnishing} `}</button>
          );
        })}
      </div>
    </div>
  );
};

const Filters = () => {
  const {
    filteredPropertyCategory,
    filteredPropertyFor,
    filteredPropertyType,
    selectedBuyBudget , setSelectedBuyBudget , selectedRentBudget , setSelectedRentBudget , selectedPgRentBudget , setSelectedPgRentBudget ,
  } = useContext(propertyContext);
  const [selectedBudget, setSelectedBudget] = useState([]);


  const BuyBudget = () => {
    const [budget, setBudget] = useState(50);
    const onChangeHandler = (e) => {
      setBudget(e.target.value);
      setSelectedBuyBudget(e.target.value  + "00000") ; 

    };
    useEffect(() => {
      console.log("budget = ", budget);
    }, [budget]);

    const parsebudget = (budget) => {
      if (budget < 100) {
        return budget + "L";
      } else if (budget >= 100) {
        return budget / 100 + " Cr.";
      }
    };

    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between">
          <p>0 L </p>
          <p>{parsebudget(budget)}</p>
          <p>100 CR </p>
        </div>
        <input
          step="5"
          name = "budget"
          min="0"
          max="1000"
          value={budget}
          onChange={onChangeHandler}
          className="w-full "
          type="range"
        />
      </div>
    );
  };


  const RentBudget = () => {
    const [budget, setBudget] = useState(50);
    const onChangeHandler = (e) => {
      setBudget(e.target.value);
      setSelectedRentBudget(e.target.value + '000') ;

    };
    useEffect(() => {
      console.log("budget = ", budget);
    }, [budget]);

    const parsebudget = (budget) => {
      if (budget < 100 ) {
        return budget + "K";
      } else if (budget >= 100) {
        return budget / 100 + " L";
      }
    };

    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between">
          <p>0 L </p>
          <p>{parsebudget(budget)}</p>
          <p>10L  </p>
        </div>
        <input
          step="5"
          name = "budget"
          min="0"
          max="1000"
          value={budget}
          onChange={onChangeHandler}
          className="w-full "
          type="range"
        />
      </div>
    );
  };

  const PGRentBudget = () => {
    const [budget, setBudget] = useState(50);
    const onChangeHandler = (e) => {
      setBudget(e.target.value);
      setSelectedPgRentBudget(e.target.value + '000') ;

    };
    useEffect(() => {
      console.log("budget = ", budget);
    }, [budget]);

    const parsebudget = (budget) => {
      if (budget < 100) {
        return budget + "K";
      } else if (budget >= 100) {
        return budget / 100 + " L";
      }
    };

    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between">
          <p>0 L </p>
          <p>{parsebudget(budget)}</p>
          <p>10 L </p>
        </div>
        <input
          step="5"
          name = "budget"
          min="0"
          max="1000"
          value={budget}
          onChange={onChangeHandler}
          className="w-full "
          type="range"
        />
      </div>
    );
  };




  const componentArray = useMemo(
    () => [
      PropertyType,
      BuyBudget,
      ContructionStatus,
      PostedBy,
      Bedroom,
      Sharing,
      AvailableFor,
      Furnishing,
      RentBudget , 
      PGRentBudget ,
    ],
    []
  );

  const filters = useMemo(
    () => [
      "Property Type",
      "Budget",
      "Construction Status",
      "Posted By",
      "bedroom",
      "sharing",
      "available for",
      "furnishing",
      "rentBudget" , 
      "pgRentBudget"
    ],
    []
  );

  const [currentSelected, setCurrentSelected] = useState(-1);
  return (
    <div className="w-full  border-black ">
      <div className="flex gap-4 flex-wrap ">
        {/* <h1>filters </h1> */}
        {/* filters heading */}
        {filters.map((filter, index) => {
          if ((index == 5 || index == 6 || index == 9  ) && filteredPropertyFor !== "PG") {
            // remove pg things in sell and rent 
            return;
          }
          if(filteredPropertyFor == "Rent" && index == 1) return; 
          if(filteredPropertyFor == 'Sell' && index == 8 ) return ;
          if (
            filteredPropertyFor == "PG" &&
            (index == 2 || index == 4 || index == 3 || index == 1 || index  == 5 || index == 8  )
          ) {
            // remove sell and rent things from pg 
            return;
          }
          if (
            (index == 2 ||
              index == 4 ||
              index == 7 ||
              index == 5 ||
              index == 6 || 
              index == 8 || 
              index == 9 ) &&
            filteredPropertyType.some((item) => item == "Plot/Land")
          ) {
            return;
          }
          return (
            <button
              className={`${
                currentSelected == index
                  ? "bg-[#ead8b1] border-2"
                  : "border-2 border-black   "
              }   px-2 py-1 rounded-full capitalize  `}
              onClick={() => {
                setCurrentSelected(index);
              }}
              key={index}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div>
        {/* filter section */}
        {componentArray.map((Component, index) => {
          return index == currentSelected && <Component key={index} />;
        })}
      </div>
    </div>
  );
};

export default Filters;
export {
  PropertyType,
  PostedBy,
  ContructionStatus,
  Sharing,
  AvailableFor,
  Bedroom,
  Furnishing,
};
