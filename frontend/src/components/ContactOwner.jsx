import React, { useContext, useEffect, useState } from "react";
import { propertyContext } from "../context/RealEstateContext";
import { toast } from "react-toastify";
import axios from "axios";
import cancel from "../assets/cancel.png";
import {motion} from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";
import profile from "../assets/profile.png";

const ContactOwner = () => {
  const { contactOwnerComp, setContactOwnerComp, propertyData } =
    useContext(propertyContext);

  const [ownerDetails, setOwnerDetails] = useState("");

  useEffect(() => {
    console.log("id = ", propertyData?.postedBy?._id);
    const id = propertyData?.postedBy?._id;
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/${id}`
        );
        console.log(response);
        setOwnerDetails(response?.data?.data);
      } catch (err) {
        console.log(err?.message);
        console.log(err);
        toast.error("Something went wrong");
      }
    })();
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}
      className="absolute h-screen top-0 left-0  w-full backdrop-blur-sm bg-black/10   z-10  flex items-center justify-center  "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
        className="flex items-center   p-10 gap-4  bg-[#091a32] rounded-xl overflow-hidden  relative "
      >
        <img
          onClick={() => {
            setContactOwnerComp(false);
          }}
          src={cancel}
          className="absolute cursor-pointer  top-0 left-0  w-10"
        />

        <div className=" rounded-full bg-gray-400 items-center backdrop-blur-2xl   ">
          {ownerDetails?.avatar !== "" && (
            <img
              className="w-32 h-32  object-contain  rounded-full  overflow-hidden self-start "
              src={ownerDetails?.avatar == "" ? profile : ownerDetails?.avatar  }
            />
          )}
        </div>
        <div className="flex flex-col gap-4 ">
          {ownerDetails?.name && (
            <div className="flex self-start gap-4 items-center px-4 py-2 rounded-xl  bg-[#08687e] ">
              <h1 className="text-xl capitalize ">Name : </h1>{" "}
              <p className="text-xl capitalize">{ownerDetails?.name}</p>
            </div>
          )}
          {ownerDetails?.email && (
            <div className="flex gap-4 self-start items-center px-4 py-2 rounded-xl  bg-[#08687e] ">
              <h1 className="text-xl capitalize flex items-center gap-1">Email : </h1>{" "}
              <p className="text-xl ">{ownerDetails?.email}</p>
            </div>
          )}
          {ownerDetails?.role && (
            <div className="flex gap-4 self-start  items-center px-4 py-2 rounded-xl  bg-[#08687e] ">
              <h1 className="text-xl capitalize">Type : </h1>{" "}
              <p className="text-xl capitalize">{ownerDetails?.role}</p>
            </div>
          )}
          {ownerDetails?.number && (
            <div className="flex self-start  gap-4 items-center px-4 py-2 rounded-xl  bg-[#08687e] ">
              <h1 className="text-xl capitalize">Number : </h1>{" "}
              <p className="text-xl capitalize">{ownerDetails?.number}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactOwner;
