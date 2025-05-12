import React from "react";
import aboutusImg from "../assets/AboutUs.jpg";
import { motion } from "framer-motion";
import PostProperty from "../components/PostProperty";

const AboutUs = () => {
  return (
    <>
      <motion.div className="about  text-[#001f3f] relative  ">
        {/* remove  */}
        <div className="w-full h-[55px] bg-slate-900 absolute top-0 "></div>

        <div className=" flex flex-col items-center gap-2 ">
          <div className="backdrop-blur-xl bg-white/50 rounded-xl px-2">
            {/* top */}
            <h1 className="text-[#354861] capitalize text-7xl tracking-wide mt-20 font-medium ">
              {" "}
              About us{" "}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-1/2 backdrop-blur-xl bg-white/30 rounded-xl "
          >
            {/* botoom */}
            <motion.p
              transition={{ delay: 0.5 }}
              className="capitalize text-xl    shadow-xl p-10"
            >
              PS realtors is a property portal, deals with every aspect of the
              consumers needs in the real estate industry. It is an online forum
              where buyers, sellers and brokers/agents can exchange information
              about real estate properties quickly, effectively and
              inexpensively. At PS realtors, you can advertise a property,
              search for a property, browse through properties..
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="py-20 bg-slate-900">
        <PostProperty />
      </div>
    </>
  );
};

export default AboutUs;
