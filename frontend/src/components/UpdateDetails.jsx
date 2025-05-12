import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import profilePhoto from "../assets/people.png";
import { propertyContext } from "../context/RealEstateContext";
import ContinueBtn from "./ContinueBtn";
import Back from "./Back";
const UpdateDetails = () => {
  const { postedBy, setPhoto, setLoading, setUserID , validateEmail , validateString  } =
    useContext(propertyContext);
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/get/user",
          config
        );
        if (response?.data?.data) {
          const { name, email, role, number, avatar } = response?.data?.data;
          setUserDetails((prev) => {
            return {
              ...prev,
              name,
              email,
              role,
              number,
              avatar,
            };
          });
        }
      } catch (err) {
        console.log(err?.message);
        console.log(err);
        toast.error("Something went wrong");
      }
    })();
  }, []);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    number: "",
    avatar: "",
  });

  const onChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    if(key == "number" && value.length > 10 )  return ; 
    setUserDetails((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleOnContinue = async (e) => {
    console.log(userDetails);
    if (
      userDetails?.role == "user" ||
      userDetails?.email == "" ||
      userDetails?.name == "" ||
      userDetails?.number == ""
    ) {
      toast.error("Please fill out all the fields");
      return false;
    }
    if(!validateString(userDetails?.name)) 
      {
        toast.error("Invalid Name : name should not contain any number") ;
        return  ; 
        
      }
    if(!validateEmail(userDetails?.email))
    {
      toast.error("Invalid Email Provided") ;
      return ; 

    }
    try {
      setLoading(true);

      const response = await axios.put(
        "http://localhost:8000/api/v1/user/modify/profile",
        userDetails,
        config
      );
      response?.data?.message?.message &&
        toast.success(response?.data?.message?.message);
      if (image !== "") {
        const formData = new FormData();
        formData.append("avatar", image);
        const uploadPhotoResponse = await axios.put(
          "http://localhost:8000/api/v1/user/upload/avatar",
          formData,
          config
        );
        console.log(uploadPhotoResponse);
        uploadPhotoResponse?.data?.message?.message &&
          toast.success(uploadPhotoResponse?.data?.message?.message);
        localStorage.setItem("photo", uploadPhotoResponse?.data?.data?.avatar);
        setPhoto(uploadPhotoResponse?.data?.data?.avatar);
        
      }
      setUserID(response?.data?.data?._id);
      return true;
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
    setLoading(false);
    return false;
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, x: "300px" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "300px" }}
      transition={{ duration: 1, ease: "easeInOut", duration: 0.5 }}
      className="text-[#f4f5f7] box-shadow flex flex-col gap-6 h-[70vh] overflow-y-scroll p-10 "
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl capitalize ">
          Start posting your property for free
        </h1>
        <p className="text-xl capitalize">
          Update your details so that buyers can reach out to you{" "}
        </p>
      </div>

      <div className="flex flex-col  gap-10">
        <div className="flex flex-col gap-4  ">
          {/* profile photo */}
          <div className="rounded-full overflow-hidden ">
            <label htmlFor="profilePhoto">
              <div className="rounded-full overflow-hidden w-32 bg-slate-400 ">
                <img
                  className="w-32 h-32 object-contain  rounded-full"
                  src={
                    image == ""
                      ? userDetails?.avatar == ""
                        ? profilePhoto
                        : userDetails?.avatar
                      : URL.createObjectURL(image)
                  }
                />
              </div>
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
          <p className="capitalize text-xl w-full ">
           Profile picture
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="relative">
            <p className="absolute top-[-10px] px-4 bg-[#091a32] ">Name : </p>
            <input
              className="outline-none bg-transparent border-2 px-4 py-3 text-xl rounded-xl "
              type="text"
              name="name"
              value={userDetails?.name}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="relative">
            <p className="absolute top-[-10px] px-4 bg-[#091a32] ">Email : </p>
            <input
              className="outline-none bg-transparent border-2 px-4 py-2 rounded-xl y-3 text-xl"
              type="email"
              name="email"
              value={userDetails?.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="flex gap-8 items-center ">
            <h2 className="capitalize text-xl">Role : </h2>
            <div className="flex gap-4 items-center  ">
              {postedBy.map((by, index) => {
                return (
                  <button
                    onClick={() => {
                      setUserDetails((prev) => {
                        return {
                          ...prev,
                          role: by,
                        };
                      });
                    }}
                    className={`${
                      userDetails?.role.toLowerCase() == by.toLowerCase()
                        ? "bg-[#08687e] text-[#f4f5f7] "
                        : "bg-[#d4e9f2] text-slate-900"
                    } px-4 py-1  rounded-2xl `}
                    key={index}
                  >
                    {by}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <p className="absolute top-[-10px] px-4 bg-[#091a32]  ">
              Number :{" "}
            </p>
            <input
              className="outline-none bg-transparent border-2 px-4 rounded-xl py-3 text-xl"
              type="number"
              name="number"
              value={userDetails?.number}
              onChange={onChangeHandler}
              required
            />
          </div>

          {/* <button className="px-4 py-2 rounded-xl bg-[#08687e] self-start ">
          Submit
        </button> */}
          <ContinueBtn handlerFunc={handleOnContinue} />
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateDetails;
