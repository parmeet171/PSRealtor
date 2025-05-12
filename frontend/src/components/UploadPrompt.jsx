import React from 'react'
import xButton from '../assets/x-button.png' ;
import {motion} from 'framer-motion';
const UploadPrompt = ({cancelBtnHandler , skipBtnHandler}) => {


  return (
    <motion.div
    exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}  className='absolute h-[100vh] w-[100vw] top-0 left-0 bg-black z-10 opacity-90 flex items-center justify-center    '>
        <motion.div   initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}  
        className='bg-[#ffffff] text-[#091a32] py-10 px-20 flex flex-col gap-4 rounded-xl z-10 relative  opacity-100 '>
            <img onClick={cancelBtnHandler} className='absolute cursor-pointer  left-[5px] top-[5px] w-8 z-10' src = {xButton} /> 
            <h1 className='text-xl capitalize '>Do you want to skip uplaoding photos for now ? </h1>
            <div className='flex items-center gap-4 '>
                <button onClick={skipBtnHandler} className='bg-[#f4f5f7] text-[#091a32] px-4 py-1 rounded-2xl text-[1.1rem] capitalize   '>skip</button>
                <button onClick={cancelBtnHandler} className='bg-[#f4f5f7] text-[#091a32] px-4 py-1 rounded-2xl text-[1.1rem] capitalize   '>cancel</button>
            </div>
        </motion.div>
      
    </motion.div>
  )
}

export default UploadPrompt
