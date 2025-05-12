import React, { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import ready from '../assets/ready.jpg' ;
import construction from '../assets/construction.jpg' ;

const ConstructionBased = () => {
  const [constructionStatus, setConstructionStatus] = useState([
    {status : "Ready to move", img : ready  } ,
    {status :  "Possesion in 2024", img : construction} ,
    {status :  "Possesion in 2025",img : construction} ,
    {status :  "Possesion in 2026",img : construction} ,
    {status :  "Possesion in 2027",img : construction} , 
  ]);
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
    <motion.div initial = {{opacity : 0 , scale : 1.2  }} whileInView = {{opacity : 1 , scale : 1  }} transition={{duration  :1 , ease : "easeInOut"  }}  className="text-[#f4f5f7] flex flex-col gap-4 w-[70%] ">
      <div className="mt-[-50px]">
        <h1 className="text-5xl self-stretch   w-full tracking-wider ">
          Move in now, next year or later
        </h1>
      </div>

      <div className="overflow-hidden  rounded-xl ">
        <Slider {...settings}>
          {constructionStatus.map((status, index) => {
            return (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  key={index}
                  className="rounded-xl  relative    mx-4 "
                >
                  <img
                    className="w-60  rounded-xl h-60 object-cover"
                    src={status.img}
                  />
                  <div className="absolute top-[15px]    p-4 bg-gray-200 text-slate-900 backdrop-blur-xl bg-white/30 font-medium capitalize  shadow-2xl w-56 rounded-xl ">
                    {status.status}
                  </div>
                </motion.div>
              </>
            );
          })}
        </Slider>
      </div>
    </motion.div>
  );
};

export default ConstructionBased;
