import React, { useContext, useEffect, useState } from "react";
import { propertyContext } from "../context/RealEstateContext";
import axios from "axios";
import { toast } from "react-toastify";
import changePassImg from "../assets/password-code.png";
import cancel from "../assets/cancel.png";
import profilePhoto from "../assets/people.png";
import { motion } from "framer-motion";

const ModifyProfile = () => {
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const { setModifyProfileComp  , setPhoto , setLoading ,validatePassword , validateString , validateEmail ,validateNumber  } = useContext(propertyContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://psrealtor.onrender.com/api/v1/user/get/user",
          config
        );
        console.log(response);
        setUserData(response?.data?.data);
      } catch (err) {
        toast.error("Something went wrong");
        console.log(err?.message);
        console.log(err);
      }
    })();
  }, []);
  const onChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    if(key == "number" && value.length > 10 )  return ; 
    setUserData((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    console.log(userData);
   
    if(!validateString(userData?.name)) 
      {
        toast.error("Invalid Name : name should not contain any number") ;
        return  ; 
        
      }
    if(!validateEmail(userData?.email))
    {
      toast.error("Invalid Email Provided") ;
      return ; 

    }
    if(!validatePassword(userData?.password))
      {
        toast.error("Invalid Password Provided : \n 1) password should be atleast 8 characters long \n 2) password must contain atleast one uppercase and number ") ;
        return ;
      }

    
    
    setLoading(true) ;

    try {
      const response = await axios.put(
        "https://psrealtor.onrender.com/api/v1/user/modify/profile",
        userData,
        config
      );
      console.log(response);
      response?.data?.message?.message &&
        toast.success(response?.data?.message?.message);
      if (image !== "") {
        const formData = new FormData();
        formData.append("avatar", image);
        const uploadPhotoResponse = await axios.put(
          "https://psrealtor.onrender.com/api/v1/user/upload/avatar",
          formData,
          config
        );
        console.log(uploadPhotoResponse);
        uploadPhotoResponse?.data?.message?.message &&
          toast.success(uploadPhotoResponse?.data?.message?.message);
        localStorage.setItem('photo' ,uploadPhotoResponse?.data?.data?.avatar) ;
        setPhoto(uploadPhotoResponse?.data?.data?.avatar) ;
        

      }
      
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      console.log(err?.message);
    }
    setLoading(false ); 
  };


  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}
      className="absolute h-screen w-full backdrop-blur-sm bg-black/10   z-10  flex items-center justify-center mt-[120px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
        className="flex flex-col gap-4 p-10 relative  shadow-white shadow-sm  bg-[#091a32] rounded-2xl"
      >
        <img
          onClick={() => {
            setModifyProfileComp(false);
          }}
          className="w-10 absolute cursor-pointer  top-[-10px] left-[-10px]"
          src={cancel}
        />
        <div className="flex flex-col  gap-3 items-center ">
          <div>
            <label htmlFor="profilePhoto">
              <img
                src={
                  image == ""
                    ? userData?.avatar == ""
                      ? profilePhoto
                      : userData?.avatar
                    : URL.createObjectURL(image)
                }
                className="max-w-20 rounded-full"
              />
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              id="profilePhoto"
              className="hidden"
              type="file"
            />
          </div>
          <h1 className="text-white text-center text-3xl ">Update Profile</h1>
        </div>
        <form
          onSubmit={onSubmitHandler}
          method="post"
          className="flex flex-col gap-10   p-10 rounded-xl "
        >
          <motion.div
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.09 }}
            className="relative"
          >
            <label className="absolute top-[-10px] bg-[#091a32] px-3 text-white  text-sm capitalize">
              Name
            </label>
            <motion.input
              className="text-xl placeholder:capitalize outline-none bg-transparent border-2 border-[#9cc5d3] px-4 py-2 text-[#f4f5f7] rounded-xl "
              type="text"
              placeholder="name"
              name="name"
              value={userData?.name}
              onChange={onChangeHandler}
            />
          </motion.div>

          <motion.div
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.09 }}
            className="relative"
          >
            <label className="absolute top-[-10px] bg-[#091a32] px-3 text-white  text-sm capitalize ">
              Email
            </label>
            <motion.input
              className="text-xl placeholder:capitalize outline-none bg-transparent border-2 border-[#9cc5d3] px-4 py-2 text-[#f4f5f7] rounded-xl "
              type="text"
              placeholder="email"
              name="email"
              value={userData?.email}
              onChange={onChangeHandler}
            />
          </motion.div>

          <motion.div
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.09 }}
            className="relative"
          >
            <label className="absolute top-[-10px] bg-[#091a32] px-3 text-white  text-sm capitalize ">
              Role
            </label>
            <motion.input
              className="text-xl placeholder:capitalize outline-none bg-transparent border-2 border-[#9cc5d3] px-4 py-2 text-[#f4f5f7] rounded-xl "
              type="text"
              placeholder="role"
              name="role"
              value={userData?.role}
              onChange={onChangeHandler}
              readOnly
            />
          </motion.div>

          <motion.div
            className="relative w-full"
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.09 }}
          >
            <label className="absolute top-[-10px] bg-[#091a32] px-3 text-white  text-sm capitalize ">
              Number
            </label>
            <motion.input
              className="text-xl placeholder:capitalize outline-none bg-transparent border-2 w-full  border-[#9cc5d3] px-4 py-2 text-[#f4f5f7] rounded-xl "
              type="number"
              placeholder="number"
              min={0}
              max={10000000000}
              name="number"
              value={userData?.number}
              onChange={onChangeHandler}
            />
          </motion.div>

          <motion.button
            whileTap={{ scale: 1 }}
            whileHover={{ scale: 1.09 }}
            className="text-[1rem] self-center rounded-2xl  px-6 py-2 bg-[#f95959] text-[#e3e3e3]"
          >
            Update profile
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModifyProfile;
