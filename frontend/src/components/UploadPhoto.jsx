import React, { useState, useEffect, useContext } from "react";
import uploadImage from "../assets/upload_area.png";
import Slider from "react-slick";
import { GiCancel } from "react-icons/gi";
import ContinueBtn from "./ContinueBtn";
import Back from "./Back";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { propertyContext } from "../context/RealEstateContext";
import UploadPrompt from "./UploadPrompt";


const UploadPhoto = () => {
  const { images, setImages,  setStepperCount  , stepperState ,  stepperCount} = useContext(propertyContext);
  const [ uploadPhotoPrompt, setUploadPhotoPrompt ] = useState(false);
  const [showImage, setShowImage] = useState(false);


  const handleCancelButton = (e) => {
    e.preventDefault();
    setUploadPhotoPrompt(false);
  };

  const handleSkipButton = (e) => {
    e.preventDefault();
    stepperCount <= stepperState?.length &&  setStepperCount(stepperCount + 1 )
  };

 

 
  const handleFunctionOnContinue = async () => {
    if (images.some((image) => image != "")) {
      setUploadPhotoPrompt(false);
      return true; 
    }
    else{
      setUploadPhotoPrompt(true);
    }
    
  };

  const onUploadImage = (e, index) => {
    console.log("file = ", e.target.files);
    let newImages = [...images];
    newImages[index] = e.target.files[0] || "";
    if (newImages.length <= 50 && !newImages.some((images) => images == ""))
      newImages.push("");
    setImages(newImages);
  };

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: "300px" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "300px" }}
        transition={{ duration: 1, ease: "easeInOut", duration: 0.5 }}
        className="text-[#f4f5f7] relative box-shadow flex flex-col gap-4 h-[70vh] overflow-y-scroll p-10 "
      >
        <Back />
        <h1 className="text-2xl capitalize ">Add photos of your property</h1>
        <p className="text-gray-400">
          A picture is worth a thousand words . 87% of buyers look at photos
          before buying{" "}
        </p>
        <p className="capitalize text-xl">upload from desktop</p>

        <div className="mt-4  w-1/4 grid grid-cols-2 gap-x-4 gap-y-4  ">
          {images.map((image, index) => {
            // console.log(index);

            return (
              <div className="relative" key={index}>
                <motion.label
                whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                 className="w-40 h-40 relative" htmlFor={index}>
                  
                  <img
                    className="w-40  rounded-md "
                    onClick={() => {
                      if (images.toString() !== "" && image !== "") {
                        setShowImage(true);
                      }
                    }}
                    src={
                      image !== "" ? URL.createObjectURL(image) : uploadImage
                    }
                    alt=""
                  />
                  {image != "" && (
                    <div
                      onClick={() => {
                        const newImages = [...images];
                        newImages[index] = "";
                        setImages(newImages);
                      }}
                      className="absolute top-0 cursor-pointer  text-red-600"
                    >
                      <GiCancel />
                    </div>
                  )}
                </motion.label>

                <input
                  disabled={image == "" ? false : true}
                  id={index}
                  hidden
                  onChange={(e) => {
                    console.log(index);
                    onUploadImage(e, index);
                  }}
                  type="file"
                  name="image"
                />
              </div>
            );
          })}
        </div>
        <ContinueBtn handlerFunc={handleFunctionOnContinue} />

        {showImage && images.filter((image) => image != "").length > 1 && (
          <div className="absolute bg-slate-900 h-[100%] w-[100%] content-center   top-0 left-0 z-10    ">
            <div className="w-[50%]  mx-auto">
              <Slider {...settings}>
                {images.map((image, index) => {
                  return (
                    image !== "" && (
                      <img
                        key={index}
                        onClick={() => {
                          setShowImage(false);
                        }}
                        className="object-cover  rounded-md"
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                    )
                  );
                })}
              </Slider>
            </div>
          </div>
        )}
      </motion.div>
     <AnimatePresence key = "modal">
     {uploadPhotoPrompt && 
        <UploadPrompt cancelBtnHandler = {handleCancelButton} skipBtnHandler = {handleSkipButton} />
        }
     </AnimatePresence>
    </>
  );
};

export default UploadPhoto;
