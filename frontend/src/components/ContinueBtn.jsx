import React , {useContext} from 'react'
import { propertyContext } from '../context/RealEstateContext'
import {motion} from 'framer-motion' ;

const ContinueBtn = ({handlerFunc =  () => {} }) => {
    const {stepperCount , 
        setStepperCount , stepperState} = useContext(propertyContext) ; 
  return (
    <motion.button whileHover={{scale : 1.1}} whileTap={{scale : .9 
       
    }} onClick={ () => {handlerFunc().then((value) => value == true && stepperCount <= stepperState?.length &&  setStepperCount(stepperCount + 1 ) )  }} className='bg-[#396d8c] text-[#f4f5f7] self-start mt-6 p-3 rounded-md'>
            Continue
    </motion.button>
  )
}
export default ContinueBtn

// 
