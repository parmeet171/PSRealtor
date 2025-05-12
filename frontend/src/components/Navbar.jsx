import React, { useContext, useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink , useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { propertyContext } from "../context/RealEstateContext";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const {
    setAuthPage,
    setIsLoginPage,
    token,
    setToken,
    setUserName,
    userName,
    setChangePasswordComp,
    setModifyProfileComp,
    photo,
    setPhoto,
  } = useContext(propertyContext);

  const navigateTo = useNavigate() ; 
  const [isHover, toggleHover] = useState(false);

  const handleOnLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("photo");
    setToken(false);
    navigateTo('/') ; 
  };
  const handleModifyProfile = () => {
    navigateTo('/') ; 
    setModifyProfileComp(true);
  };
  const handleChangePassword = () => {
    setChangePasswordComp(true);
  };

  useEffect(() => {
    const tkn = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");
    const photo = localStorage.getItem("photo");
    setPhoto(localStorage.getItem("photo"));
    console.log(name);

    name && setUserName(name);
    if (tkn) setToken(tkn);
    else {
      setToken(false);
    }
  }, []);

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      // rotateX: 0,
      y: 0,

      transition: {
        // duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      // rotateX: -15,
      y: "-50px",
      transition: {
        duration: 0.5,
        // delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`fixed  w-[100%]  backdrop-blur-md bg-white/20  px-10 py-4   flex items-center justify-between  z-50  `}
    >
      <NavLink to="/">
        <motion.div
          animate={{ opacity: [0, 0.5, 1] }}
          transition={{ duration: 1, delay: 0.3 }}
          className=" overflow-hidden font-extrabold tracking-normal flex text-[#d8d8dc] "
        >
          <img className="w-10" src={Logo} />
          {/* HP REALTORS */}
        </motion.div>
      </NavLink>
      {
        <ul className="flex gap-5">
          <NavLink to="/">
            <motion.li
              whileHover={{ scale: 1.1, color: "#EAD8B1" }}
              whileTap={{ scale: 0.9 }}
              className="capitalize text-xl text-gray-200  "
            >
              Home
            </motion.li>
          </NavLink>
          <NavLink to="/properties">
            <motion.li
              whileHover={{ scale: 1.1, color: "#EAD8B1" }}
              whileTap={{ scale: 0.9 }}
              className="capitalize text-xl text-gray-200"
            >
              Properties
            </motion.li>
          </NavLink>
          {/* <NavLink to="/">
            <motion.li
              whileHover={{ scale: 1.1, color: "#EAD8B1" }}
              whileTap={{ scale: 0.9 }}
              className="capitalize text-xl text-gray-200"
            >
              Builders
            </motion.li>
          </NavLink> */}
          <NavLink to="/about">
            <motion.li
              whileHover={{ scale: 1.1, color: "#EAD8B1" }}
              whileTap={{ scale: 0.9 }}
              className="capitalize text-xl text-gray-200"
            >
              About us
            </motion.li>
          </NavLink>
          <NavLink to="/contact">
            <motion.li
              whileHover={{ scale: 1.1, color: "#EAD8B1" }}
              whileTap={{ scale: 0.9 }}
              className="capitalize text-xl text-gray-200"
            >
              Contact us
            </motion.li>
          </NavLink>
        </ul>
      }

      {/* search bar  */}
      {/* {
        propertiesRoute && <div onClick={() => {setSearchProperty(true )}} className="w-[60%] px-8 bg-[#396d8c] py-3 rounded-md   flex gap-4 items-center  ">

          <span className="text-[#f4f5f7] text-xl"><CiSearch/></span>
          <input readOnly className="bg-transparent text-xl    w-full  outline-none text-[#f4f5f7]" type = 'text'/>
          <button className="bg-[#699ab0] text-[#f4f5f7] px-3 py-1 rounded-md ">Search</button>
        </div>
      } */}
      <div className="flex items-center  gap-10">
        <NavLink to="/post-property">
          <motion.button
            whileHover={{ scale: 1.1, background: "#d8d8dc", color: "black" }}
            whileTap={{ scale: 0.9 }}
            className="capitalize text-gray-200  text-[1.2rem] px-2 border-2 rounded-xl "
          >
            Post Property
          </motion.button>
        </NavLink>
        {/* <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className=" relative p-3 bg-gray-200 flex items-center justify-center rounded-full "
        >
          <FaUser />
          <RiArrowDropDownLine className="" />

        </motion.div> */}

        {!token ? (
          <div className="flex px-4 py-1 gap-2 rounded-full items-center  bg-transparent border-2  text-gray-200 ">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setAuthPage(true);
                setIsLoginPage(true);
                navigateTo('/')
              }}
              className="capitalize font-medium text-gray-50"
            >
              Login
            </motion.button>
            <p>/</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigateTo('/')
                setAuthPage(true);
                setIsLoginPage(false);
              }}
              className="capitalize font-medium text-gray-200 "
            >
              Register
            </motion.button>
          </div>
        ) : (
          <motion.div
            onHoverStart={() => {
              toggleHover(true);
            }}
            onHoverEnd={() => {
              toggleHover(false);
            }}
            variants={subMenuAnimate}
            className="user-menu-container flex relative   bg-[#d8d8dc] rounded-full items-center w-10 h-10  justify-center   "
          >
            <div className="rounded-full overflow-hidden">
              {photo == "" ? (
                <FaUser className="text-xl" />
              ) : (
                <img className="w-5" src={photo} />
              )}
            </div>
            {/* <RiArrowDropDownLine className="" /> */}

            <motion.div
              // initial="exit"
              animate={isHover ? "enter" : "exit"}
              variants={subMenuAnimate}
              className="user-menu absolute   overflow-y-auto  p-4  w-48  bg-white top-14 rounded-xl  right-0"
            >
              <ul className="flex flex-col gap-4">
                <motion.li className=" text-xl">{`Hi ${userName} !`}</motion.li>
                {/* <motion.li className="text-slate-900 font-medium text-xl ">
                  My activity
                </motion.li> */}

                <NavLink to="/my/properties">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#0e1c24" }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 120,
                    }}
                  >
                    My properties
                  </motion.li>
                </NavLink>
                <NavLink to="/chats">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#0e1c24" }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 120,
                    }}
                  >
                    Chats
                  </motion.li>
                </NavLink>
                <motion.li
                  whileHover={{ scale: 1.1, color: "#0e1c24" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                >
                  Recently Viewed
                </motion.li>
                <NavLink to="/view/liked/property">
                  <motion.li
                    whileHover={{ scale: 1.1, color: "#0e1c24" }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 120,
                    }}
                  >
                    Shortlisted
                  </motion.li>
                </NavLink>
               

                <hr className="h-[1px] bg-black opacity-60" />
                <motion.li
                  onClick={handleChangePassword}
                  whileHover={{ scale: 1.1, color: "#0e1c24" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                >
                  Change Passwrod
                </motion.li>
                <motion.li
                  onClick={handleModifyProfile}
                  whileHover={{ scale: 1.1, color: "#0e1c24" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                >
                  Modify Profile
                </motion.li>
                <motion.li
                  onClick={handleOnLogOut}
                  whileHover={{ scale: 1.1, color: "#0e1c24" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                >
                  Logout
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* shadow */}
    </motion.div>
  );
};

export default Navbar;
