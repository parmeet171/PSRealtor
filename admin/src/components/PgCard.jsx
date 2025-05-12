import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import Slider from "react-slick";
import { IoCall } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import rentImg from "../assets/rent.png";
import { useNavigate } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import noImage from "../assets/no-image.png";
import deleteImg from "../assets/delete.png";
import axios from "axios";
import { toast } from "react-toastify";

// const property = propertyInfo[2];
const PgCard = ({ likeCount = 0, searchCount = 0, property }) => {
  const [viewNumber, setViewNumber] = useState(false);
  const propertyFeatures = [
    ...property.locationAdvantages,
    ...property.otherFeatures,
    ...property.amenities,
    ...property.propertyFeatures,
  ];
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
  const navigateTo = useNavigate();
  const combineAddress = () => {
    let address = "";

    if (property?.subLocality) {
      address += property?.subLocality + " ";
    }
    if (property?.locality) {
      address += property?.locality + " ";
    }
    if (property?.premise) {
      address += property?.premise + " ";
    }
    if (property?.postalCode) {
      address += property?.postalCode + " ";
    }
    address = address.trim();
    if (address.length >= 12) {
      return address.substring(0, 12) + "...";
    }
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

  const deleteProperty = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/admin/property/${id}`
      );
      console.log(response);
    } catch (err) {
      toast.error("Something went wrong while deleting property");
      console.log(err);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-[85%]    mx-auto relative   bg-transparent p-4 flex border-2 items-start gap-4 rounded-xl box-shadow "
      >
        <div className=" w-[30%] h-auto rounded-xl overflow-hidden ">
          {/* images  */}
          {property?.images?.length == 0 && (
            <img src={noImage} className="object-cover w-full  h-64" />
          )}

          {property?.images?.length == 1 && (
            <img src={property?.images} className="object-cover w-full h-64" />
          )}
          {property?.images  && property?.images?.length > 1 && <Slider {...settings}>
            {property.images.map((img, index) => {
              return (
                <img key={index} src={img} className="object-cover w-64 h-64" />
              );
            })}
          </Slider>}
        </div>

        <div
          onClick={() => {
            deleteProperty(property?._id);
          }}
          className="absolute right-5 top-10 cursor-pointer "
        >
          <img className="w-10" src={deleteImg} />
        </div>

        {searchCount > 0 && (
          <div className="absolute left-0 top-0  cursor-pointer ">
            <div className="text-2xl bg-orange-500  text-slate-900 flex items-center justify-center rounded-full h-10 w-10 ">
              {searchCount}
            </div>
          </div>
        )}

        {likeCount > 0 && (
          <div className="absolute left-0 top-0  cursor-pointer ">
            <div className="text-2xl bg-orange-500  text-slate-900 flex items-center justify-center rounded-full h-10 w-10 ">
              {likeCount}
            </div>
          </div>
        )}

        <div
          className={`${
            property?.propertyStatus == "Sold" ? "bg-red-500" : "bg-green-500 "
          } absolute px-6 py-4 rounded-2xl left-0 top-[-10px]`}
        >
          <button className="capitalize">
            {property?.propertyStatus == "Sold" ? "Sold" : "Active"}
          </button>
        </div>

        <div
          onClick={() => {
            navigateTo(`/view/property/${property?._id}`);
          }}
          className="w-[65%] flex flex-col gap-4 cursor-pointer  "
        >
          {/* info */}

          <h1 className="cpaitalize text-xl flex gap-2 font-light capitalize ">
            {`${
              property?.pgAvailableFor == "any"
                ? "Girls/Boys"
                : property?.pgAvailableFor
            } PG/Paying Guest  in ${combineAddress()}  `}
          </h1>

          <div className="flex gap-4  items-center ">
            <div className="flex flex-col gap-1 items-center   font-medium ">
              {/* price */}
              <p className="capitalize text-2xl flex items-center gap-1 ">
                <FaRupeeSign className="text-[1.1rem]" />
                {property?.rent}{" "}
                {property?.pgRoomType == "sharing" && (
                  <span className="capitalize text-sm">/Bed</span>
                )}
                {property?.pgRoomType == "private" && (
                  <span className="capitalize text-sm">/Room</span>
                )}
              </p>
              {property?.securityDeposit && (
                <p className="capitalize text-[1rem]">
                  + Deposit {property?.securityDeposit}
                </p>
              )}
            </div>
            <span className="">|</span>

            <div className="flex flex-col gap-1 items-center">
              <p className="capitalize text-2xl">
                <span className="capitalize font-medium">{`${property?.pgRoomType}`}</span>
              </p>
              <p className="capitalize text-xl">PG Room Type</p>
            </div>

            <span className="">|</span>
            {property?.food && (
              <div className="flex flex-col gap-1 items-center ">
                {/* facing */}
                <p className="capitalize text-2xl">{property?.food}</p>
                <p className="capitalize text-xl">Food</p>
              </div>
            )}
            <span className="">|</span>
            {property?.propertyFacing && (
              <div className="flex flex-col gap-1 items-center ">
                {/* facing */}
                <p className="capitalize text-2xl">
                  {property?.propertyFacing}
                </p>
                <p className="capitalize text-xl">property facing</p>
              </div>
            )}
          </div>
          {propertyFeatures.length !== 0 && (
            <div className="flex bg-[#396d8c] p-3 rounded-xl gap-4 items-center ">
              <p className="capitalize text-2xl font-medium">highlights </p>
              <div className="flex flex-wrap  gap-4">
                {propertyFeatures.map((feat, index) => {
                  if (index > 7) return;

                  return (
                    <p
                      key={index}
                      className="px-3 py-1 border-2 rounded-full capitalize flex items-center gap-1  "
                    >
                      <span>
                        <IoCheckmark />
                      </span>
                      {feat}
                    </p>
                  );
                })}
                {/* <span className="justify-end">....</span> */}
              </div>
            </div>
          )}
          <div className="flex gap-4 mx-auto bg-[#396d8c] absolute left-10 bottom-0 px-4 py-2 rounded-2xl text-[#f4f5f7]  ">
            <p className="capitalize ">{`${
              property?.postedBy?.name < 7
                ? property?.postedBy?.name
                : `${property?.postedBy?.name?.slice(0, 7)}...`
            }  , ${property?.postedBy?.role}`}</p>
            <p></p>
            {/* <p className="capitalize "> {property?.postedBy?.role} </p> */}
            <button
              onClick={() => {
                setViewNumber(true);
              }}
              className="capitalize flex items-center gap-1 "
            >
              {" "}
              <span className="">
                <IoCall />
              </span>{" "}
              {viewNumber ? property?.postedBy?.number : "View Number"}
            </button>
          </div>
        </div>
        <div className="absolute capitalize rounded-xl px-4 py-1  right-0  top-[-12px]  bg-[#396d8c] text-[#f4f5f7] ">
          posted on {property?.postedOn}
        </div>
        <div className="absolute right-24 w-16">
          {/* for rent */}
          <img className="w-full" src={rentImg} />
        </div>
        <div className="absolute right-64 ">
          {/* for rent */}
          <div className="bg-[#ffaa01] capitalize  text-[#001f3f]  px-4 rounded-md ">
            {property?.furnishing}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PgCard;
