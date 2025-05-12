import React , {useState, useContext , useEffect } from 'react'
import SearchPopUp from '../components/SearchPopUp' ;
import axios from 'axios'; 
import PgCard from '../components/PgCard';
import RentCard from '../components/RentCard';
import SellCard from '../components/SellCard';
import {motion , AnimatePresence}  from 'framer-motion'  ; 
import {toast} from 'react-toastify' ; 
import { propertyContext } from '../context/RealEstateContext';
import { IoFilter } from "react-icons/io5";
import error from '../assets/error.png' ;

const LikedProperty = () => {
  const [likedProperty , setLikedProperty ] = useState([]); 
  const [noResults , setNoResults ] = useState(false); 

  const {showFilters , setShowFilters   } = useContext(propertyContext)  ;
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  useEffect(() => {console.log(likedProperty)} , [likedProperty])

  useEffect(() => {
    ;(async () => {
      try{

        const response = await axios.get('http://localhost:8000/api/v1/liked/property/' , config) ; 
        console.log(response);  
        if(response?.data?.data?.length == 0 ){setNoResults(true)} ;
          setLikedProperty(response?.data?.data) ; 
      }
      catch(err)
       {
        console.log(err); 
        console.log(err?.message) ;
        toast.error("Something went wrong") ;

       }
    })()
  } , [] ) ; 
  return (
    <div className='bg-[#001f3f]  p-4 text-[#f4f5f7]'>
      
    {noResults ? <><div className='flex items-center justify-center h-screen  '><h1 className='text-5xl capitalize font-medium '>No Liked property to show </h1></div></> : <div className='w-full  h-auto mt-28 bg-[#001f3f] '>
     <AnimatePresence>
        {
           showFilters && <SearchPopUp key = "modal"/>
        }
      </AnimatePresence>
      {/* listings */}
      {/* no search results  */}
  
      
     

      <div className='flex flex-col gap-10'>
      <div className='flex items-center '>
            <h1 className='text-5xl capitalize'> Liked Properties :  </h1>
        </div>
        {
         likedProperty?.length > 0  && likedProperty.map((property , index ) => {
            if(property?.property?.propertyFor === "Sell")
            {
              return <SellCard key = {property?.property?._id} property = {property?.property}/>
            }
            else if(property?.property?.propertyFor === "Rent")
            {
              return <RentCard key = {property?.property?._id} property = {property?.property}/>
            }
            else if(property?.property?.propertyFor === "PG")
            {
              return <PgCard key = {property?.property?._id} property = {property?.property}/>
            }
          })
        }
      </div>
    </div>}
  </div>
  )
}

export default LikedProperty
