import React , {useEffect  , useState} from 'react' 
import {motion , AnimatePresence} from 'framer-motion' ;
import SellCard from '../../../admin/src/components/SellCard.jsx';
import RentCard from '../components/RentCard.jsx';
import PgCard from '../components/PgCard.jsx';
import {toast} from 'react-toastify' ;
import { IoFilter } from "react-icons/io5";
import axios from 'axios' ;
import error from '../assets/error.png' ;

const ViewProperties = () => {

  const [properties , setProperties ] = useState([] ) ;

  const viewActiveProperty = async () => {
    

    try{
      const response =await axios.get('https://psrealtor.onrender.com/api/v1/admin/active/properties') ;
      setProperties(response?.data?.data) ;
      console.log(response) ; 

    }
    catch(err) 
    {
      toast.error('Something went wrong while fetching sold properties')
      console.log(err) ;
    }
  }

 
  const viewSoldProperties = async () => {
    

    try{
      const response =await axios.get('https://psrealtor.onrender.com/api/v1/admin/sold/properties') ;
      setProperties(response?.data?.data) ;
      console.log(response) ; 

    }
    catch(err) 
    {
      toast.error('Something went wrong while fetching sold properties')
      console.log(err) ;

    }

  }

  const viewAllProperties = async () => {
    try {

      const response = await axios.get('https://psrealtor.onrender.com/api/v1/admin/properties'); 
      setProperties(response?.data?.data) ;
      console.log(response) ;
    }
    catch(err) {
      toast.error("Something went wrong : while fetching all properties") ; 
      console.log(err ) ;
      
    }
  }


  useEffect(() => {
    viewAllProperties() .then(() => {}).catch(err => console.log(err)) ; 
  } , [] ) ;

  return (
    <div className='bg-[#001f3f]  p-4 text-[#f4f5f7]'>
      <div className='w-full  h-auto mt-28 bg-[#001f3f] '>
      
        {/* listings */}
        {/* no search results  */}
       
        
      

        <div className='flex flex-col gap-10'>

          <h1 className='text-5xl mx-4 '>All properties : </h1>

          <div className='flex items-center justify-center gap-4 '>
          <motion.button whileHover={{scale : 1.1}} onClick={viewSoldProperties} className='capitalize bg-red-500  text-slate-900 px-4 py-2 rounded-xl  '> view Sold properties </motion.button>
          
          <motion.button whileHover={{scale : 1.1}} onClick={async () => {await viewAllProperties() }} className='capitalize bg-[#e8eaf6]  text-slate-900 px-4 py-2 rounded-xl  '> view  all properties  </motion.button>

          <motion.button whileHover={{scale : 1.1}} onClick={viewActiveProperty} className='capitalize bg-lime-500  text-slate-900 px-4 py-2 rounded-xl  '> view active properties </motion.button>
          
          </div>
         
          {
           properties && properties.map((property , index ) => {
              if(property?.propertyFor === "Sell")
              {
                return <SellCard key = {property?._id} property = {property}/>
              }
              else if(property?.propertyFor === "Rent")
              {
                return <RentCard key = {property?._id} property = {property}/>
              }
              else if(property?.propertyFor === "PG")
              {
                return <PgCard key = {property?._id} property = {property}/>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ViewProperties
