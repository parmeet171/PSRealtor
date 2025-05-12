import React, { useState } from "react";
import { motion } from "framer-motion";
import houseIcon from "../assets/home-button.png";
import houseImg from "../assets/house.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BrowseByBudget from "./BrowseByBudget";
const PropertyFilters = () => {
  const [bhk, setBkk] = useState(["1", "2", "3", "4", "4+"]);
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
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="bg-slate-900 py-10 h-[100%]  text-[#f4f5f7] flex flex-col gap-20 items-center justify-center  ">
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-[70%] flex flex-col gap-4 items-center p-4      bg-slate-900  text-[#f4f5f7] rounded-xl"
      >
        <div className="flex items-center self-start gap-4 ">
          <div>
            <img className="w-20" src={houseImg} />
          </div>
          <div className="flex flex-col    ">
            <h1 className="text-4xl font-medium tracking-wider ">
              BHK choice in mind?
            </h1>
            <p className="text-[1rem] ">
              Browse by no. of bedrooms in the house
            </p>
          </div>
        </div>

        <div className="w-full ">
          <Slider {...settings}>
            {bhk.map((item, index) => {
              return (
                <>
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="border-2 rounded-xl bg-[#f4f5f7] text-[#001f3f] mx-4 items-center shadow-xl  p-6 flex flex-col gap-4"
                  >
                    <img className="w-16" src={houseIcon} />
                    <p className="text-xl uppercase  font-medium ">{`${item} BHK`}</p>
                    <p className="text-[1rem] font-medium ">1200+ Properties</p>
                  </motion.div>
                </>
              );
            })}
          </Slider>
        </div>
      </motion.div>

      {/* filter by advertiser */}
      {/* <div className="h-screen mt-100">
        <BrowseByBudget />
      </div> */}
    </div>
  );
};

export default PropertyFilters;
