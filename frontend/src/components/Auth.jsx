import React, { useContext, useEffect, useState } from "react";
import authLogo from "../assets/auth.png";
import { motion, AnimatePresence } from "framer-motion";
import close from "../assets/close.png";
import { propertyContext } from "../context/RealEstateContext";
import axios from "axios";
import { toast } from "react-toastify";

const Auth = () => {
  const {
    setAuthPage,
    isLoginPage,
    setIsLoginPage,
    setToken,
    setUserName,
    setPhoto,
    setLoading,
    validatePassword,
    validateString,
    validateEmail,
  } = useContext(propertyContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setData((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data?.email == "" || data?.password == "") {
      toast.error("please provide email and password");
      return;
    } else if (!isLoginPage && data?.name == "") {
      toast.error("name feild is required ");
      return;
    }
    if (!isLoginPage && !validateString(data?.name)) {
      toast.error("Invalid Name : name should not contain any number");
      return;
    }
    if (!validateEmail(data?.email)) {
      toast.error("Invalid Email Provided");
      return;
    }
    if (!isLoginPage && !validatePassword(data?.password)) {
      toast.error(
        "Invalid Password Provided : \n 1) password should be atleast 8 characters long \n 2) password must contain atleast one uppercase and number "
      );
      return;
    }

    setLoading(true);
    try {
      if (isLoginPage) {
        const response = await axios.post(
          "http://localhost:8000/api/v1/user/login",
          data
        );
        console.log(response);
        toast.success(response?.data?.message);
        setToken(response?.data?.data?.token);
        localStorage.setItem("accessToken", response?.data?.data?.token);
        localStorage.setItem("photo", "");
        setAuthPage(false);
        response?.data?.data?.user?.name &&
          setUserName(response?.data?.data?.user?.name);
        response?.data?.data?.user?.name &&
          localStorage.setItem("name", response?.data?.data?.user?.name);
        localStorage.setItem("photo", response?.data?.data?.user?.avatar);
        setPhoto(response?.data?.data?.user?.avatar);
      } else {
        const response = await axios.post(
          "https://psrealtor.onrender.com/api/v1/user/register",
          data
        );
        console.log(response);
        toast.success(response?.data?.message);
        setToken(response?.data?.data?.token);
        localStorage.setItem("accessToken", response?.data?.data?.token);
        localStorage.setItem("photo", "");
        setAuthPage(false);
        response?.data?.data?.user?.name &&
          setUserName(response?.data?.data?.user?.name);
        response?.data?.data?.user?.name &&
          localStorage.setItem("name", response?.data?.data?.user?.name);
        localStorage.setItem("photo", "");
        setPhoto("");
      }
    } catch (err) {
      if (err?.response?.data?.message)
        toast.error(err?.response?.data?.message);

      console.log(err?.message);
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <motion.div
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}
      className={`absolute h-full bg-opacity-75 flex items-center justify-center z-10 w-full ${
        isLoginPage ? "mt-[40px]" : "mt-[50px]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
        className="flex flex-col relative  w-[30%] rounded-xl p-10 shadow-xl items-center   gap-4 bg-[#f2f2f2]  "
      >
        <div
          onClick={() => {
            setAuthPage(false);
          }}
          className="absolute top-3 h-[100%] left-4 cursor-pointer  "
        >
          <img className="w-8" src={close} />
        </div>
        <div className="p-4 border-2 border-[#001F3F] rounded-full">
          <img className="w-20" src={authLogo} />
        </div>

        <h1 className="text-3xl capitalize text-[#001F3F] ">
          {isLoginPage ? "Sign in" : "Sign up"}
        </h1>

        <form
          method="post"
          className="flex w-full  items-center  flex-col gap-4"
          onSubmit={handleOnSubmit}
        >
          {!isLoginPage && (
            <input
              className="p-3 w-3/4 text-xl border-2 border-[#001F3F] rounded-md  outline-none bg-transparent placeholder:text-xl"
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              required
            />
          )}
          <input
            className="p-3 w-3/4 text-xl border-2 border-[#001F3F] rounded-md  outline-none bg-transparent placeholder:text-xl"
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            required
          />
          <input
            className="p-3 w-3/4 text-xl border-2 border-[#001F3F] rounded-md  outline-none bg-transparent placeholder:text-xl"
            type="password"
            placeholder="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            required
          />
          {/* <button className="self-center text-[#3A6D8C]   w-3/4 text-[1.1rem] capitalize   ">
            {isLoginPage && "forgot password ?"}
          </button> */}
          <motion.button
            whileHover={{ scale: 1.1, color: "#EAD8B1", background: "#001F3F" }}
            whileTap={{ scale: 0.9 }}
            className="p-3 border-2  border-[#001F3F] px-10 rounded-full  text-[#001F3F]"
            type="submit"
          >
            {isLoginPage ? "Login" : "Register"}
          </motion.button>
        </form>

        <p className="capitalize  ">
          <span>
            {isLoginPage ? "Not a member as yet ?" : "Already a member"}{" "}
          </span>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="text-[#3A6D8C] text-xl capitalize"
            onClick={() => {
              setIsLoginPage(!isLoginPage);
            }}
          >
            {isLoginPage ? "register now " : "Login"}
          </motion.button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
