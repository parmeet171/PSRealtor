import React , {useContext} from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { propertyContext } from '../context/RealEstateContext';
import {motion} from 'framer-motion' ;

const Back = () => {
    const {stepperCount , 
        setStepperCount} = useContext(propertyContext) ; 
  return (
    <motion.div whileHover={{scale : 1.1}} whileTap = {{scale : .9  }} className='cursor-pointer w-fit   ' onClick={() => {setStepperCount(stepperCount - 1 )}} >
       <IoIosArrowRoundBack  className='text-[#f4f5f7] rounded-md border-2 text-4xl'/>
       </motion.div>
  )
}

export default Back
