import React , {useContext} from 'react'
import {motion , AnimatePresence} from 'framer-motion' ;
import landingPage from "../assets/landingPage.png";
import { propertyContext } from '../context/RealEstateContext';
import { NavLink } from 'react-router-dom';

const WelcomeChat = ({noChats }) => {

    const {userName } = useContext(propertyContext) ; 


  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        ease: "anticipate",
        duration: 0.4,
      }}
      className={`${noChats ? 'w-[100%]' : 'w-[80%]'} mt-16   content-center bg-slate-900   `}
    >
      <div className="flex flex-col gap-4">
        
        <h1 className="text-center bg-text-gray-200  text-gray-200 text-4xl ">
          👋 Welcome <span className="text-[#f0566f]">{userName}</span><br/> <p className="capitalize text-[1rem]  ">start chatting....</p>
          {noChats && <NavLink to = "/properties"><motion.button whileHover={{scale : 1.1}} className='text-sm bg-[#e8eaf6] capitalize  text-[#001f3f] px-4 py-1 rounded-full'>View properties</motion.button></NavLink>}
        </h1>
        <img className="w-[80%] mx-auto  " src={landingPage} alt="" />
        
      </div>
    </motion.div>
  </AnimatePresence>
  )
}

export default WelcomeChat
