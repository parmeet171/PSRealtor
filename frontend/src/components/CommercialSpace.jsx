import React , {useState} from "react";
import land from '../assets/land.jpg' ;
import officeSpace from '../assets/officeSpace.jpg'
import retailSpace from '../assets/retailSpace.jpg'
import commercialSpaces from '../assets/commercialSpaces.jpg' ;
import warehouses from '../assets/warehouses.jpg' ;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {motion} from 'framer-motion'
import ConstructionBased from "./ConstructionBased";

const CommercialSpace = () => {


  const [commercialSubCategory, setCommercialSubCategory] = useState([
    {name : "Retail Spaces" , img : retailSpace },
    {name : "Office Spaces", img :officeSpace }  ,
    {name :"land" , img : land }  , 
    {name : "Warehouses", img : warehouses} ,
    {name : "Commercial Spaces", img : commercialSpaces} 
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

  const  settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3500 ,
    cssEase: "linear",
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <motion.div  className="bg-slate-900 py-10 h-[100%]  text-[#f4f5f7] flex flex-col gap-20 items-center justify-center  ">
      <motion.div initial = {{opacity : 0, scale : 1.2  }} whileInView = {{opacity : 1, scale : 1  }} transition={{duration  :1 , ease : "easeInOut"   }} className="flex flex-col gap-4 w-[70%]">
      <div className="mt-[100px]">
        <h1 className="text-5xl self-stretch  w-full tracking-wider ">Invest in commercial projects</h1>
        {/* <p className="text-sm  text-gray-400 ">Explore commercial projects</p> */}
      </div>

      <div className="overflow-hidden rounded-xl ">
        <Slider {...settings}>
        {commercialSubCategory.map((subCategory, index) => {
          return (
            <>
              <motion.div whileHover={{scale : 1.1}}  key = {index} className="rounded-xl  relative    mx-4 ">
                <img className="w-60  rounded-xl h-60 object-cover" src = {subCategory.img}/>
                <div className="absolute top-[15px]    p-4 bg-gray-200 text-slate-900 backdrop-blur-xl bg-white/30 font-medium capitalize  shadow-2xl w-56 rounded-xl ">{subCategory.name}</div>
              </motion.div>
            </>
          );
        })}
        </Slider>
      </div>
      </motion.div >

      <ConstructionBased/>
    </motion.div>
  );
};

export default CommercialSpace;
