import React from 'react'

const Other = ({name , text = "" }) => {
  return (
    <div className='self-start flex  gap-4 items-center   '>
      <div className='bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full '>{name?.[0]}</div>
      <div className='bg-gray-300 text-slate-900   flex flex-col gap-1 lg:p-3 p-2  rounded-xl '>
        <p>{name}</p>
        <p>{text}</p>
        {/* <p className='text-xs self-end'>{time}</p> */}
      </div>
    </div>
  )
}

export default Other
