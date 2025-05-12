import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import propertyInfo from "../assets/assets.js";
import Slider from "react-slick";
import area from "../assets/area.png";
import bed from "../assets/bed.png";
import price from "../assets/price.png";
import rupeeIndian from "../assets/rupee-indian.png";
import address from "../assets/address.png";
import stairs from "../assets/stairs.png";
import compass from "../assets/compass.png";
import noImage from "../assets/no-image.png";
import propertyAge from "../assets/propertyAge.png";
import contruction from "../assets/contruction.png";
import family from "../assets/family.png";
import { FaRupeeSign } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";
import ContactInfo from "../components/ContactInfo.jsx";
import { propertyContext } from "../context/RealEstateContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import PropertyInfo from "../components/PropertyInfo.jsx";
import PropertyFeatures from "../components/PropertyFeatures.jsx";
import PropertyLocationAdv from "../components/PropertyLocationAdv.jsx";
import PropertyAmenities from "../components/PropertyAmenities.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBed } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import PropertyFurnishingInfo from "../components/PropertyFurnishingInfo.jsx";
import constructionImg from "../assets/construction.png";
import ContactOwner from "../components/ContactOwner.jsx";
import ChatArea from "../components/ChatArea.jsx";
import { GoogleMap } from "@react-google-maps/api";
import GoogleMapComponent from "../components/GoogleMapComponent.js";

const Property = () => {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [likeBtnClicked, setLikeBtnClicked] = useState(false);
  const {
    contactInfo,
    showContactInfo,
    propertyData,
    setPropertyData,
    contactOwnerComp,
    setContactOwnerComp,
    setAuthPage,
    isLoaded,
    chatAreaComp,
    setChatAreaComp,
  } = useContext(propertyContext);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  const pricePerSqFtCalculator = () => {
    if (propertyData?.price) {
      if (propertyData?.plotArea) {
        return Math.floor(propertyData?.price / propertyData?.plotArea);
      } else if (propertyData?.carpetArea) {
        return Math.floor(propertyData?.price / propertyData?.carpetArea);
      } else if (propertyData?.builtUpArea) {
        return Math.floor(propertyData?.price / propertyData?.builtUpArea);
      } else if (propertyData?.superBuiltUpArea) {
        return Math.floor(propertyData?.price / propertyData?.superBuiltUpArea);
      }
    }
  };

  const combineAddress = () => {
    let address = "";

    if (propertyData?.subLocality) {
      address += propertyData?.subLocality + " ";
    }
    if (propertyData?.locality) {
      address += propertyData?.locality + " ";
    }
    if (propertyData?.premise) {
      address += propertyData?.premise + " ";
    }
    if (propertyData?.postalCode) {
      address += propertyData?.postalCode + " ";
    }
    if (propertyData?.houseNo) {
      address += "\n house no " + propertyData?.houseNo + " ";
    }
    address = address.trim();

    return address;
  };
  const priceCompressor = (price) => {
    let newPrice = 0;
    if (price < 100000) return price;

    if (price >= 100000 && price < 10000000) {
      newPrice = price / 100000 + " Lac.";
    } else if (price >= 10000000) {
      newPrice = price / 10000000 + " Cr.";
    }
    return newPrice;
  };

  const checkIfPropertyLiked = async () => {
    try {
      const response = await axios.get(
        `https://psrealtor.onrender.com/api/v1/liked/property/check/liked/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("is property liked ? ", response);
      return response;
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err?.message);
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      checkIfPropertyLiked()
        .then((response) => {
          console.log("is property liked ? ", response);
          response?.data?.data && setLikeBtnClicked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    (async () => {
      try {
        const propertyResponse = await axios.get(
          `https://psrealtor.onrender.com/api/v1/property/${id}`
        );
        console.log("PROPERTY = ", propertyResponse);
        setPropertyData(propertyResponse?.data?.data);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${
            propertyResponse?.data?.data?.locality +
            propertyResponse?.data?.data?.subLocality
          }&format=json`
        );
        console.log("use effect => ", response);

        const newCoordinates = {
          lat: Number(response.data?.[0]?.lat),
          lng: Number(response.data?.[0]?.lon),
        };
        setCoordinates(newCoordinates);
      } catch (err) {
        toast.error("Something went wrong");
        console.log(err?.message);
        console.log(err);
      }
    })();
  }, []);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "white" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "white" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const onClickLikeBtnHandler = async (e) => {
    if (!token) {
      toast.error("Please log in first to like the property");
      setAuthPage(true);
      return;
    }

    if (likeBtnClicked == true) {
      try {
        const response = await axios.delete(
          `https://psrealtor.onrender.com/api/v1/liked/property/delete/${id}`,
          { data: null },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        toast.success("property disliked");
      } catch (err) {
        console.log(err);
        console.log(err?.message);
        toast.error("Something went wrong : while disliking the property");
      }
    } else {
      try {
        const response = await axios.post(
          `https://psrealtor.onrender.com/api/v1/liked/property/create/${id}`,
          { data: null },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        toast.success("property liked");
      } catch (err) {
        console.log(err);
        console.log(err?.message);
        toast.error("Something went wrong : while liking the property");
      }
    }
    setLikeBtnClicked(!likeBtnClicked);
  };

  return (
    <>
      <motion.div className="bg-[#001f3f] p-4 text-[#f4f5f7] relative   ">
        <div className="w-[97%]    p-4  mx-auto mt-20 z-10  flex flex-col  gap-10  relative   ">
          {chatAreaComp && (
            <ChatArea
              postedBy={propertyData?.postedBy}
              setChatAreaComp={setChatAreaComp}
            />
          )}
          <AnimatePresence key="modal">
            {contactOwnerComp && <ContactOwner />}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="p-10 flex gap-4 items-center  border-[#d8d8dc]  rounded-xl w-full backdrop-blur-sm bg-slate-900/50 box-shadow2 "
          >
            <div className="flex   ">
              {propertyData?.price && (
                <div className="flex flex-col gap-3">
                  <p className="text-5xl flex items-center gap-2 tracking-wider leading-8">
                    <span>
                      <FaRupeeSign className="text-2xl" />
                    </span>
                    {priceCompressor(propertyData?.price)}{" "}
                  </p>
                  <p className=" capitalize flex items-center gap-1 self-center  text-[1rem] ">
                    @{" "}
                    <span>
                      <FaRupeeSign />
                    </span>{" "}
                    {pricePerSqFtCalculator()} per sqft.{" "}
                  </p>
                </div>
              )}

              {propertyData?.rent && (
                <div className="flex flex-col gap-3">
                  <p className="text-5xl flex items-center gap-2 tracking-wider leading-5">
                    <span>
                      <FaRupeeSign className="text-2xl" />
                    </span>
                    {priceCompressor(propertyData?.rent)}{" "}
                  </p>

                  {propertyData?.propertyFor == "Rent" && (
                    <p className="text-xl self-center text-right capitalize">
                      (per month)
                    </p>
                  )}
                  {propertyData?.propertyFor == "PG" &&
                    propertyData?.pgRoomType == "sharing" && (
                      <p className="text-xl  text-right capitalie ">
                        {" "}
                        for 1 bed per month{" "}
                      </p>
                    )}
                  {propertyData?.propertyFor == "PG" &&
                    propertyData?.pgRoomType == "private" && (
                      <p className="text-xl  text-right capitalie ">
                        {" "}
                        for 1 room per month{" "}
                      </p>
                    )}
                </div>
              )}

              {/* {propertyData?.pgRent && (
                <div className="flex flex-col  gap-2">
                  <p className="text-5xl flex items-center gap-2 tracking-wider leading-5">
                    <span>
                      <FaRupeeSign className="text-2xl" />
                    </span>
                    {propertyData?.pgRent}{" "}
                  </p>
                  <span className="text-xl">for 1 bed per month</span>
                </div>
              )} */}
            </div>

            <div className="">|</div>

            {propertyData?.pgRoomType && (
              <div className="">
                {/* shared room  */}
                <div className="flex flex-col gap-1 ">
                  <div className="flex gap-2 ">
                    <p className="text-3xl capitalize ">
                      {propertyData?.pgRoomType}
                    </p>
                    <p className="text-3xl capitalize ">for</p>
                    <p className="text-3xl capitalize ">
                      {propertyData?.pgAvailableFor}
                    </p>
                  </div>
                  {/* property   */}
                  <div>
                    {/* property type */}
                    <p className="text-xl capitalize">
                      {propertyData?.propertyType}
                    </p>
                  </div>

                  <div>
                    {/* address */}
                    <p className="text-xl capitalize">in {combineAddress()}</p>
                  </div>
                </div>
              </div>
            )}

            {propertyData?.propertyFor != "PG" && (
              <div className="">
                {/* shared room  */}
                <div className="flex flex-col gap-1 ">
                  {propertyData?.bedrooms && (
                    <div className="flex gap-2 ">
                      <p className="text-3xl capitalize ">
                        {propertyData?.bedrooms}BHK
                      </p>
                    </div>
                  )}
                  {/* property   */}
                  <div>
                    {/* property type */}
                    <p className="text-xl leading-normal capitalize">
                      {propertyData?.commercialPropertyType && (
                        <div className="flex gap-4 items-center  ">
                          <p className="text-2xl capitalize"> {propertyData?.propertyCategory} </p>
                          <p className="text-2xl capitalize">
                          
                            {propertyData.commercialPropertyType}{" "}
                          </p>
                          
                        </div>
                      )}
                      {propertyData?.propertyType == "Plot/Land" && (
                        <p>{propertyData?.propertyCategory}</p>
                      )}
                      {propertyData?.propertyType}
                    </p>
                  </div>

                  <div>
                    {/* address */}
                    <p className="text-xl capitalize">in {combineAddress()}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="">|</div>

            <div className="flex-1">
              {/*  */}

              <div className="text-right flex items-end flex-col gap-4 ">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setContactOwnerComp(true);
                  }}
                  className="px-4 py-2 bg-[#396d8c] text-[#f4f5f7] capitalize cursor-pointer rounded-md  flex items-center gap-2 "
                >
                  <span className="text-[1rem]">
                    <FaPhoneAlt />
                  </span>
                  Contact owner
                </motion.button>
                <motion.button
                  onClick={onClickLikeBtnHandler}
                  whileHover={{ scale: 1.1 }}
                  className={`${
                    likeBtnClicked
                      ? "bg-red-950"
                      : " bg-[#396d8c] text-[#f4f5f7]"
                  } px-4 py-2  capitalize cursor-pointer rounded-md flex items-center gap-1`}
                >
                  {" "}
                  <span className="text-xl">
                    <FcLike />
                  </span>
                  {likeBtnClicked ? "liked" : "like"}
                </motion.button>

                <button
                  onClick={() => {
                    setChatAreaComp(true);
                  }}
                  className="bg-[#396d8c] text-[#f4f5f7] px-4 py-2 rounded-md "
                >
                  Chat
                </button>
              </div>
            </div>
          </motion.div>

          {/* main div */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex justify-between  w-[100%] relative  "
          >
            <div className="w-[47%] h-[30rem] overflow-hidden rounded-xl ">
              {/* left */}
              {propertyData?.images?.length == 0 && (
                <img
                  src={noImage}
                  className="  h-full w-full  object-cover  self-center "
                />
              )}
              {propertyData?.images?.length > 0 && (
                <Slider {...settings}>
                  {propertyData?.images?.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        className="w-[80%] h-[500px] object-cover "
                      />
                    );
                  })}
                </Slider>
              )}
            </div>
            <div className="w-[50%] box-shadow absolute h-[100%] p-4 right-12 z-5 rounded-2xl bg-[#d8d8dc]  border-2 text-[#001f3f] ">
              {/* right */}

              <div className="w-[100%] h-[100%] grid grid-cols-2 grid-rows-4 gap-x-4 gap-y-4 items-center    ">
                {propertyData?.price && (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={price} alt="" />
                      <h1 className="capitalize text-2xl font-medium">price</h1>
                    </div>

                    <div className="flex flex-col gap-1">
                      {/* price  */}
                      <p className="capitalize text-xl flex items-center gap-1 ">
                        <span>
                          <img className="w-4" src={rupeeIndian} />
                        </span>
                        {priceCompressor(propertyData?.price)}
                      </p>
                      <p className=" capitalize flex items-center gap-1 self-start  text-sm ">
                        (@{" "}
                        <span>
                          <FaRupeeSign />
                        </span>{" "}
                        {pricePerSqFtCalculator()} per sqft. ){" "}
                      </p>
                    </div>

                    {/* price  */}
                  </div>
                )}

                {propertyData?.rent && propertyData?.propertyFor === "Rent" && (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={price} alt="" />
                      <h1 className="capitalize text-2xl font-medium">Rent</h1>
                    </div>

                    <div className="flex flex-col gap-1">
                      {/* price  */}
                      <p className="capitalize text-xl flex items-center gap-1 ">
                        <span>
                          <img className="w-4" src={rupeeIndian} />
                        </span>
                        {priceCompressor(propertyData?.rent)}{" "}
                        <span className="text-[1rem]">/month</span>
                      </p>
                    </div>

                    {/* price  */}
                  </div>
                )}

                {propertyData?.rent && propertyData?.propertyFor == "PG" && (
                  <div>
                    {/* PG   */}

                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={price} alt="" />
                      <h1 className="capitalize text-2xl font-medium">Rent</h1>
                    </div>

                    <div className="flex flex-col gap-1">
                      {/* price  */}
                      <p className="capitalize text-xl flex items-center gap-1 ">
                        <span>
                          <img className="w-4" src={rupeeIndian} />
                        </span>
                        {propertyData?.rent}{" "}
                        {propertyData?.pgRoomType == "sharing" && (
                          <span className="text-[1rem] capitalize">/bed</span>
                        )}
                        {propertyData?.pgRoomType == "private" && (
                          <span className="text-[1rem] capitalize">/room</span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {propertyData?.propertyFor !== "PG" && (
                  <div className="flex flex-col gap-2   ">
                    {/* area details */}

                    <div className="flex gap-4  items-center ">
                      <img className="w-8" src={area} alt="" />
                      <h1 className="capitalize text-2xl font-medium">Area</h1>
                    </div>

                    <div className="flex flex-col gap-2">
                      {propertyData?.plotArea && (
                        <p className="capitalize text-xl">
                          Plot Area : {propertyData?.plotArea}{" "}
                          <span className="text-[#396d8c] ">sq.ft.</span>
                        </p>
                      )}
                      {propertyData?.carpetArea && (
                        <p className="capitalize text-xl">
                          Carpet Area : {propertyData?.carpetArea}{" "}
                          <span className="text-[#396d8c] ">sq.ft.</span>
                        </p>
                      )}

                      {propertyData?.builtUpArea && (
                        <p className="capitalize text-xl">
                          Built Up Area : {propertyData?.builtUpArea}{" "}
                          <span className="text-[#396d8c] ">sq.ft.</span>
                        </p>
                      )}

                      {propertyData?.superBuiltUpArea && (
                        <p className="capitalize text-xl">
                          {" "}
                          Super Built Up Area{
                            propertyData?.superBuiltUpArea
                          }{" "}
                          <span className="text-[#396d8c] ">sq.ft.</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {propertyData?.bathrooms && (
                  <div className="flex flex-col gap-2">
                    {/* configuration  */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={bed} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        configuration
                      </h1>
                    </div>

                    <div>
                      <p className="capitalize text-xl">{`${
                        propertyData?.bedrooms
                      } bedroom ,  ${propertyData?.bathrooms} bathroom ,  ${
                        propertyData?.balconies == 0
                          ? "No"
                          : propertyData?.balconies
                      } balcony`}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  {/* address */}

                  <div className="flex gap-4 flex-wrap  items-center ">
                    <img className="w-6" src={address} alt="" />
                    <h1 className="capitalize text-2xl font-medium">address</h1>
                  </div>

                  <div className="text-xl capitalize">
                    <p>{combineAddress()}</p>
                  </div>
                </div>

                {propertyData?.floorNumber && (
                  <div className="flex flex-col gap-2">
                    {/* property on floor if exists */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={stairs} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        Floor number
                      </h1>
                    </div>

                    <div className="text-xl">
                      <p>{`${propertyData?.floorNumber} of ${propertyData?.totalFloors} floors  `}</p>
                    </div>
                  </div>
                )}

                {propertyData?.propertyFacing && (
                  <div>
                    {/* property facing if exists */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={compass} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        Property Facing
                      </h1>
                    </div>
                    <div className="text-xl">
                      <p className="text-xl capitalize ">
                        {propertyData?.propertyFacing}
                      </p>
                    </div>
                  </div>
                )}

                {propertyData?.noOfAllowedFloorConstruction && (
                  <div>
                    {/* property facing if exists */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={constructionImg} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        Allowed Floor for construction
                      </h1>
                    </div>
                    <div className="text-xl">
                      <p className="text-xl capitalize ">
                        {propertyData?.noOfAllowedFloorConstruction} Floors
                      </p>
                    </div>
                  </div>
                )}

                {propertyData?.NoOfOpenSides && (
                  <div>
                    {/* property facing if exists */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={constructionImg} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        No of open sides in the plot
                      </h1>
                    </div>
                    <div className="text-xl">
                      <p className="text-xl capitalize ">
                        {propertyData?.NoOfOpenSides} Sides
                      </p>
                    </div>
                  </div>
                )}

                {propertyData?.pgCapacity && (
                  <div className="flex flex-col  gap-3 px-4 border-r-[1px]">
                    {/* months of notice */}
                    <p className="apitalize text-2xl font-medium flex items-center gap-4 ">
                      <span>
                        <HiMiniUserGroup />
                      </span>
                      PG capacity{" "}
                    </p>
                    <p className="capitalize text-xl flex gap-1 ">
                      {propertyData?.pgCapacity}
                      <span className="capitalize text-[1rem]">
                        (Total beds)
                      </span>
                    </p>
                  </div>
                )}

                {propertyData?.pgRoomType && (
                  <div className="flex flex-col gap-2">
                    {/* property age  */}
                    <div className="flex gap-4 items-center ">
                      <span className="text-2xl">
                        <FaBed />
                      </span>
                      <h1 className="capitalize text-2xl font-medium">
                        Beds per room
                      </h1>
                    </div>
                    <div className="text-xl">
                      <p className="text-xl capitalize ">
                        {propertyData?.pgRoomType == "sharing"
                          ? propertyData?.sharingPeopleCount + " Beds per room"
                          : "1 bed per room"}
                      </p>
                    </div>
                  </div>
                )}

                {propertyData?.propertyAge && (
                  <div className="flex flex-col gap-2">
                    {/* property age  */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={propertyAge} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        Property Age
                      </h1>
                    </div>
                    <div className="text-xl">
                      <p className="text-xl capitalize ">
                        {propertyData?.propertyAge} years
                      </p>
                    </div>
                  </div>
                )}

                {propertyData?.constructionStatus && (
                  <div>
                    {/* construction status */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={contruction} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        Construction Status
                      </h1>
                    </div>
                    <div className="text-xl">
                      <p className="text-xl capitalize ">
                        {propertyData?.constructionStatus}
                      </p>
                    </div>
                  </div>
                )}

                {/* rent */}

                {propertyData?.availableFor && (
                  <div>
                    {/* avialable for */}
                    <div className="flex gap-4 items-center ">
                      <img className="w-8" src={family} alt="" />
                      <h1 className="capitalize text-2xl font-medium">
                        Available For
                      </h1>
                    </div>
                    <div className="flex flex-col gap-1">
                      {/* price  */}
                      <p className="capitalize text-xl flex items-center gap-1 ">
                        {propertyData?.availableFor}{" "}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <PropertyInfo propertyData={propertyData} />
          {propertyData?.propertyFeatures?.length !== 0 && (
            <PropertyFeatures propertyData={propertyData} />
          )}
          {propertyData?.locationAdvantages?.length !== 0 && (
            <PropertyLocationAdv propertyData={propertyData} />
          )}
          {propertyData?.amenities?.length !== 0 && (
            <PropertyAmenities propertyData={propertyData} />
          )}

          {propertyData?.furnishing !== "Un-furnished" &&
            (propertyData?.furnishingDetails?.length > 0 ||
              propertyData?.otherFurnishingDetails?.length > 0) && (
              <PropertyFurnishingInfo />
            )}

          <GoogleMapComponent address={combineAddress()} />

          <div>{/* contact dealer */}</div>
          {/* related property */}
        </div>

        {/* contact info */}

        <AnimatePresence>
          {contactInfo && (
            <ContactInfo key="modal" propertyInfo={propertyData} />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Property;
