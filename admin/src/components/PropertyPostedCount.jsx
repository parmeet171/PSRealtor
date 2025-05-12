import React from 'react'
import { useEffect , useState  } from 'react';
import {toast} from 'react-toastify' ;
import axios from 'axios' ; 


const PropertyPostedCount = ({id}) => {
    const [postedCount , setPostedCount ]   = useState(0); 

    useEffect(() => {

        ;(async () => {
            try{

                const response = await axios.get(`https://psrealtor.onrender.com/api/v1/admin/properties/posted/${id}`); 
                setPostedCount(response?.data?.data?.length) ;
            }
            catch(err ) 
            {
                console.log(err) ;
                toast.error("Something went wrong while fetching property posted count  user") ; 
                
            }
        })()

    } , [] ) ;

  return (
    <div className='flex gap-4 items-center '>
      <p className='text-xl font-medium capitalize'>Property Posted : </p>
      <p className='text-xl  capitalize'>{postedCount}</p>
    </div>
  )
}

export default PropertyPostedCount
