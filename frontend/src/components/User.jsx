import React , {useState} from 'react'

const User = ({message}) => {
  return (
    <div  className='self-end px-4 py-1 rounded-2xl  bg-[#9cc5d3]'>
      <p className='text-xl '>{message}</p>
    </div>
  )
}

export default User
