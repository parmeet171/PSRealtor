import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='bg-slate-900 h-screen text-[#e8eaf6] flex flex-col items-center justify-center '>
        <h1 className="text-5xl my-10 text-center  capitalize  text-[#9cc5d3] ">
          Administrator DashBoard
        </h1>
        <div className='flex flex-col gap-4 '>
            <Link to = "/properties">
            <div className='bg-[#123f67] text-3xl font-medium px-6 py-3  rounded-2xl   '>
                View Properties
            </div>
            </Link>

            <Link to = "/users">
            <div className='bg-[#123f67] text-3xl font-medium px-6 py-3  rounded-2xl   '>
                Users
            </div>
            </Link>

            <Link to = "/most/searched/properties">
            <div className='bg-[#123f67] text-3xl font-medium px-6 py-3  rounded-2xl   '>
                Most Searched Properties
            </div>
            </Link>

            <Link to = "/most/liked/properties">
            <div className='bg-[#123f67] text-3xl font-medium px-6 py-3  rounded-2xl   '>
                Most Liked Properties
            </div>
            </Link>

        </div>
      
    </div>
  )
}

export default Home
