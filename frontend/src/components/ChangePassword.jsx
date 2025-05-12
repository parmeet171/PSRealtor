import React, { useContext, useState } from "react";
import { propertyContext } from "../context/RealEstateContext";
import axios from "axios";
import changePassImg from "../assets/password-code.png";
import cancel from "../assets/cancel.png";
import {motion} from 'framer-motion' ;
import {toast} from 'react-toastify' ;


const ChangePassword = () => {
  const { changePasswordComp, setChangePasswordComp , setLoading  } =
    useContext(propertyContext);
  const [ passwordInfo, setPasswordInfo ] = useState({
    oldPassword : ""  , 
    newPassword : "" , 
    confirmPassword : ""
  });
  const onChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setPasswordInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const {oldPassword , newPassword , confirmPassword} = passwordInfo ; 
    if(!oldPassword || !newPassword  || !confirmPassword) 
    {
      toast.error("Please fill out all the fields") ;
      return ; 
    }

    if(passwordInfo?.newPassword !== passwordInfo?.confirmPassword) 
    {
      toast.error("newPassword and confirm password should be same") ;
      return; 
    }

    setLoading(true ) ;


    try{

      const response = await axios.put('https://psrealtor.onrender.com/api/v1/user/update/password' ,  passwordInfo  , config ) ; 
      console.log(response)  ;
      toast.success(response?.data?.message?.message) ; 

    }
    catch(err  ) 
    {
      console.log(err?.message) ;
      console.log(err)  ; 
      toast.error("Something went wrong") ;

    }
    setLoading(false) ;
  };

  return (
    <motion.div  exit={{ opacity: 0, scale: 0 }}
    transition={{ duration: 1, type: "spring", stiffness: 120 }} className="absolute h-screen w-full backdrop-blur-sm bg-black/10   z-10  flex items-center justify-center mt-[80px] ">
      <motion.div  initial={{opacity : 0 , scale :  0 }} animate = {{opacity : 1 , scale : 1 }} transition={{ duration: 1, type: "spring", stiffness: 120 }}   className="flex flex-col gap-4 p-10 relative  shadow-white shadow-sm  bg-[#091a32] rounded-2xl">
        <img
          onClick={() => {
            setChangePasswordComp(false);
          }}
          className="w-10 absolute cursor-pointer  top-[-10px] left-[-10px]"
          src={cancel}
        />
        <div className="flex flex-col  gap-3 items-center ">
          <img src={changePassImg} className="w-20" />

          <h1 className="text-white text-center text-3xl ">Update password</h1>
        </div>
        <form
          className="flex flex-col gap-10   p-10 rounded-xl "
          method="post"
          onSubmit={handleOnSubmit}
        >
          <motion.input
          whileTap={{scale : 1}} whileHover={{scale : 1.09}}            
            name="oldPassword"
            className="text-xl placeholder:capitalize outline-none bg-transparent border-2 border-[#9cc5d3] px-4 py-2 text-[#f4f5f7] rounded-xl "
            type="password"
            placeholder="old password"
            value={passwordInfo?.oldPassword}
            onChange={onChangeHandler}
            required
          />
          <motion.input
          whileTap={{scale : 1}} whileHover={{scale : 1.09}}            
            name="newPassword"
            className="text-xl placeholder:capitalize outline-none bg-transparent border-2 border-[#9cc5d3] px-4 py-2 text-[#f4f5f7] rounded-xl "
            type="password"
            placeholder="new password"
            value={passwordInfo?.newPassword}
            onChange={onChangeHandler}
            required 
          />
          <motion.input
          whileTap={{scale : 1}} whileHover={{scale : 1.09}}            
            name="confirmPassword"
            className="text-xl placeholder:capitalize outline-none bg-transparent border-2 border-[#9cc5d3] px-4 py-2 text-[#f4f5f7] rounded-xl "
            type="password"
            placeholder="confirm password"
            value={passwordInfo?.confirmPassword}
            onChange={onChangeHandler}
            required
          />

          <motion.button
          whileTap={{scale : 1}} whileHover={{scale : 1.09}}            
           className="text-[1rem] self-center rounded-2xl  px-6 py-2 bg-[#f95959] text-[#e3e3e3]">
            update password
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChangePassword;
