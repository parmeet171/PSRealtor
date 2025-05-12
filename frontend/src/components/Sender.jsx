import React from 'react'
import { IoCheckmarkDone } from "react-icons/io5";
const Sender = ({text}) => {
  return (
    <div className='bg-[#d9fdd2] rounded-xl  dark:bg-[#015c4b] dark:text-gray-200  self-end flex flex-col gap-2 lg:p-3 p-2  mr-2 '>
      <p>{text}</p> 
      {/* <p className='self-end text-xs '>{time}</p> */}
      <p className='self-end text-xs ' ><IoCheckmarkDone/></p>
    </div>
  )
}

export default Sender
