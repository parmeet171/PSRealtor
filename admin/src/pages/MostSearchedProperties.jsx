import React , {useEffect, useState } from 'react'
import axios from 'axios' ;
import {toast} from 'react-toastify' ;
import {motion , AnimatePresence} from 'framer-motion' ;
import SellCard from '../components/SellCard';
import RentCard from '../components/RentCard';
import PgCard from '../components/PgCard';
const MostSearchedProperties = () => {

  const [msp , setMSP] = useState([]); 
  const [noResults , setNoResults] = useState(false);


  useEffect(() => {
    ;(async () => {
      try{

        const response = await axios.get('http://localhost:8000/api/v1/admin/most/search/properties') ;
        console.log(response ) ;
        if(response?.data?.data?.length == 0 ) setNoResults(true) ;

        else{
          setMSP(response?.data?.data) ;
        }
        
      }
      catch(err) 
      {
        console.log(err) ;

      }
    })()

  } , [] ) ;

  return (
    <div className='bg-[#001f3f]  p-4 text-[#f4f5f7]'>
      
    {noResults ? <><div className='flex items-center justify-center h-screen  '><h1 className='text-5xl capitalize font-medium '>No Search property to show </h1></div></> : <div className='w-full  h-auto mt-28 bg-[#001f3f] '>
    
      {/* listings */}
      {/* no search results  */}
  
      
     

      <div className='flex flex-col gap-10'>
      <div className='flex items-center '>
            <h1 className='text-5xl capitalize'> Most Searched  Properties :  </h1>
        </div>
        {
         msp?.length > 0  && msp.map((property , index ) => {
            if(property?.property?.propertyFor === "Sell")
            {
              return <SellCard searchCount = {property?.count} key = {property?.property?._id} property = {property?.property}/>
            }
            else if(property?.property?.propertyFor === "Rent")
            {
              return <RentCard searchCount = {property?.count} key = {property?.property?._id} property = {property?.property}/>
            }
            else if(property?.property?.propertyFor === "PG")
            {
              return <PgCard searchCount = {property?.count} key = {property?.property?._id} property = {property?.property}/>
            }
          })
        }
      </div>
    </div>}
  </div>
  )
}

export default MostSearchedProperties
