import React , {useEffect  , useState} from 'react'
import {motion , AnimatePresence} from 'framer-motion' ;
import axios from 'axios' ;
import SellCard from '../components/SellCard';
import RentCard from '../components/RentCard';
import PgCard from '../components/PgCard';
import {toast} from 'react-toastify' ;
import { IoFilter } from "react-icons/io5";

const MyProperties = () => {
    const [noResults , setNoResults ] = useState(false); 
    const [myProperties , setMyProperties] = useState([] );

const tkn = localStorage.getItem("accessToken");


  const config = {
    headers: {
      Authorization: "Bearer " + tkn,
    },
  };

    useEffect(() => {
        ;(async () => {
            try{
                const response = await axios.get('https://psrealtor.onrender.com/api/v1/property/my/properties' , config ) ;
                console.log(response?.data?.data) ;
                setMyProperties(response?.data?.data)  ;
                if(response?.data?.data?.length == 0 ) setNoResults(true) ;


                
            }
            catch(err) 
            {
                console.log(err)  ;
                toast.error("Something went wrong : while fetching my properties") ;
            }
        })()

    } , [] ) ;

  return (
    <div className='bg-[#001f3f]  p-4 text-[#f4f5f7]'>
      
    {noResults ? <><div className='flex items-center justify-center h-screen  '><h1 className='text-5xl capitalize font-medium '>No Property Posted Till Now ! </h1></div></> : <div className='w-full relative  h-auto mt-28 bg-[#001f3f] '>
    
      {/* listings */}
      {/* no search results  */}

     


      <div className='flex flex-col gap-10'>
        <div className='flex items-center '>
            <h1 className='text-5xl capitalize'> My properties :  </h1>
        </div>
        {
         myProperties?.length > 0  && myProperties.map((property , index ) => {
            if(property?.propertyFor === "Sell")
            {
              return <SellCard myProperties= {1} liked = {true} key = {property?._id} property = {property}/>
            }
            else if(property?.propertyFor === "Rent")
            {
              return <RentCard myProperties= {1} liked = {true} key = {property?._id} property = {property}/>
            }
            else if(property?.propertyFor === "PG")
            {
              return <PgCard myProperties= {1} liked = {true} key = {property?._id} property = {property}/>
            }
          })
        }
      </div>
    </div>}
  </div>
  )
}

export default MyProperties
