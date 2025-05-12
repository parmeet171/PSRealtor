import React , {useContext} from 'react'
import profile from "../assets/profile.png";
import cancel from "../assets/cancel.png";
import { propertyContext } from "../context/RealEstateContext";
import {motion , AnimatePresence} from 'framer-motion' ;

const ContactInfo = () => {
    const {contactInfo , showContactInfo , propertyData} = useContext(propertyContext) ;

  return (
    <div className='absolute h-screen w-[100%] top-0 left-0 flex items-center justify-center   '>
      <motion.div exit={{ opacity: 0, scale: 0 }}
      initial = {{opacity : 0 , scale : 0 }}
      animate = {{opacity : 1 , scale : 1}} 
      transition={{ duration: 1, type: "spring", stiffness: 120 }} className='bg-[#f4f5f7] text-[#001f3f] px-20 py-10 flex items-center gap-4 relative rounded-xl  '>
        <div onClick={() => {showContactInfo(false)}} className='absolute top-[-5px] left-[-5px] cursor-pointer '>
            <img className='w-10' src = {cancel} />
        </div>
        <div>
            <img className='w-64 ' src = {propertyData?.avatar == ""  ? profile : propertyData?.avatar} />
        </div>
        <div className='capitalize text-xl flex flex-col gap-4'>
            <p className='font-medium'>name : <span className='font-normal text-[1.2rem] '>{propertyData?.postedBy?.name}</span></p>
            
            <p className='font-medium'>number : <span className='font-normal text-[1.2rem] '>{propertyData?.postedBy?.number}</span></p>
            <p className='font-medium'>{propertyData?.postedBy?.role}</p>
        </div>

        <div className='absolute top-[-8px] right-0 bg-[#396d8c] text-[#fffbf3] px-4 py-1 rounded-xl'>
            <p>posted on : {propertyData?.createAt}</p>
        </div>

      </motion.div>
    </div>
  )
}

export default ContactInfo
