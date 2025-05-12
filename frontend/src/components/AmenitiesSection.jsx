import React, { useContext , useState } from 'react'
import Back from './Back'
import { propertyContext } from '../context/RealEstateContext'
import ContinueBtn from './ContinueBtn';
import {motion} from 'framer-motion' ;
import { toast } from 'react-toastify';
import axios from 'axios' ;
import Loader from './Loader';
// import {motion} from 'framer-motion' ;


const AmenitiesSection = () => {

    const {locationAdvantages , 
        propertyFacing , 
        otherFeatures , 
        flooringType , 
        amenities , 
        PropertyFeatures,  
      data , 
      userID , setUserID, 
    setData , selectedpropertyFeatures , setSelectedPropertyFeatures,
    selectedLocationAdvantages  , setSelectedLocationAdvantages,
    selectedAmenities , setSelectedAmenities,
    selectedPropertyFacing , setSelectedPropertyFacing ,
    selectedOtherFeatures , setSelectedOtherFeatures,
    selectedFlooringType , setSelectedFlooringType, images ,loading, setLoading } = useContext(propertyContext) ; 
    
    const handleFunctionOnContinue = async () => {
      if(selectedPropertyFacing == "") {
        toast.error('please specify your property facing') ;
        return false    ; 
      }
      // if(selectedFlooringType == "") 
      // {
      //   toast.error("please specify your property flooring") ;
      //   return false  ; 
      // }
      
        
      try{
        console.log(userID);
      if(userID !== "" ) 
        {
          const newData = {
            ...data ,
            postedBy : userID 
          }
          setData(newData) ;
          const response = await axios.post("http://localhost:8000/api/v1/property/create" , newData  )  ;
        response?.data?.data?.message && toast.success(response?.data?.data?.message) ;
        console.log(response);
        
        response?.data?.message?.message && toast.success(response?.data?.message?.message); 
        
        if (images.some((image) => image !== "") ) {
          const filteredImagesLists = images.filter((file) => file != "") ;
          const formData = new FormData() ;
          filteredImagesLists.map((file) => {
            formData.append("images" , file) ;
          })
          const imageUploadResponse = await axios.put(`http://localhost:8000/api/v1/property/upload/photos/${response?.data?.data?._id}` , formData) ; 
          console.log("image uplaoded" , imageUploadResponse ) ;
          response?.data?.message?.message && toast.success(imageUploadResponse?.data?.message?.message); 
        }
        return true ;
        }
        else{
          toast.error("Please update your profile details first to post the property") ;
          return false;
        }
      }
      catch(err) 
      {
        console.log(err ) ;
        console.log(err?.message) ;
        err?.response?.data?.message && toast.error(err?.response?.data?.message);

      }
      
      return false; 
    }

  return (
    <><motion.div initial = {{opacity : 0  , x : "300px"}} animate = {{opacity : 1, x : 0 } } exit = {{opacity : 0 , x : "300px"  }} transition = {{ duration : 1 ,  ease : 'easeInOut'  ,duration : .5 ,    }}    className='text-[#f4f5f7] box-shadow flex flex-col gap-4 h-[70vh]  overflow-y-scroll p-10 '>
    <Back/>

    <h1 className='text-3xl capitalize  '>Unique features about property</h1>
    <p className='text-gray-400 text-sm  capitalize' > All fields on this page are optional</p>

    <div className='flex flex-col gap-4  mt-4 '>
      <h1 className='text-2xl capitalize flex items-center gap-2 '>Property Features<span>(Optional)</span></h1>
      <div className="flex flex-wrap gap-4">
          {PropertyFeatures.map((feature, index) => {
            return (
              <motion.button
              whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
              onClick={() => {
                if(selectedpropertyFeatures.some((item) => item == feature))
                  {
                    const newSelectedPropertyFeatures = selectedpropertyFeatures.filter((item) => item != feature)
                    setSelectedPropertyFeatures(newSelectedPropertyFeatures) ;
                    setData((data) => { 
                      {
                        return {
                          ...data , 
                          propertyFeatures : newSelectedPropertyFeatures
                        }
                      }


                    })


                  }
                  else{
                    const newSelectedPropertyFeatures = [
                      ...selectedpropertyFeatures , 
                      feature, 
                    ]
                    setSelectedPropertyFeatures(newSelectedPropertyFeatures) ;
                    setData((data) => { 
                      {
                        return {
                          ...data , 
                          propertyFeatures : newSelectedPropertyFeatures
                        }
                      }
                    })


                  }
              } }
                className={`capitalize   px-3 py-1 rounded-full ${selectedpropertyFeatures.some((item) => item==feature) ? 'bg-[#396d8c] text-[#f4f5f7]' : 'bg-[#f4f5f7] text-slate-900'} `}
                key={index}
              >
                {feature}
              </motion.button>
            );
          })}
        </div>
    </div>

    <div className='flex flex-col gap-4  mt-4 '>
      <h1 className='text-2xl capitalize flex items-center gap-2 '>Amenities <span>(Optional)</span></h1>
      <div className="flex gap-4">
          {amenities.map((amenitie, index) => {
            return (
              <motion.button
              whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
                onClick={() => {
                  if(selectedAmenities.some((item) => item == amenitie))
                    {
                      const newSelectedAmenities = selectedAmenities.filter((item) => item != amenitie)
                      setSelectedAmenities(newSelectedAmenities) ;
                      setData((data) => { 
                        {
                          return {
                            ...data , 
                            amenities : newSelectedAmenities
                          }
                        }


                      })
  
  
                    }
                    else{
                      const newSelectedAmenities = [
                        ...selectedAmenities , 
                        amenitie, 
                      ]
                      setSelectedAmenities(newSelectedAmenities) ;
                      setData((data) => { 
                        {
                          return {
                            ...data , 
                            amenities : newSelectedAmenities
                          }
                        }
                      })
  
  
                    }
                }}
                className={` capitalize  px-3 py-1 rounded-full ${selectedAmenities.some((item) => item == amenitie )   ? 'bg-[#396d8c] text-[#f4f5f7]' : 'text-slate-900 bg-[#f4f5f7]' }`}
                key={index}
              >
                {amenitie}
              </motion.button>
            );
          })}
        </div>
    </div>


    <div className='flex flex-col gap-4  mt-4'>
      <h1 className='text-2xl capitalize flex items-center  gap-2'>Location advantages<span>(Optional)</span></h1>
      <div className="flex gap-4 flex-wrap">
          {locationAdvantages.map((location, index) => {
            return (
              <motion.button
              whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
              onClick={() => {
                if(selectedLocationAdvantages.some((item) => item == location))
                  {
                    const newSelectedLocationAdvantage = selectedLocationAdvantages.filter((item) => item != location)
                    setSelectedLocationAdvantages(newSelectedLocationAdvantage) ;
                    setData((data) => { 
                      {
                        return {
                          ...data , 
                          locationAdvantages  : newSelectedLocationAdvantage
                        }
                      }


                    })


                  }
                  else{
                    const newSelectedLocationAdvantage = [
                      ...selectedLocationAdvantages , 
                      location, 
                    ]
                    setSelectedLocationAdvantages(newSelectedLocationAdvantage) ;
                    setData((data) => { 
                      {
                        return {
                          ...data , 
                          locationAdvantages : newSelectedLocationAdvantage
                        }
                      }
                    })


                  }
              }}
                className={`capitalize   px-3 py-1 rounded-full  ${selectedLocationAdvantages.some((item) => item == location) ? 'bg-[#396d8c] text-[#f4f5f7]' : 'text-slate-900 bg-[#f4f5f7]'}`}
                key={index}
              >
                {location}
              </motion.button>
            );
          })}
        </div>
    </div>


    <div className='flex flex-col gap-4 mt-4 '>
      <h1 className='text-2xl capitalize flex items-center gap-2 '>property Facing<span>(Required)</span></h1>
      <div className="flex gap-4 flex-wrap">
          {propertyFacing.map((facing, index) => {
            return (
              <motion.button
              whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
               onClick={() => {setSelectedPropertyFacing(facing) ; setData((data) => {
                return {
                  ...data , 
                  propertyFacing : facing
                }
               })}}
                className={` capitalize   px-3 py-1 rounded-full ${selectedPropertyFacing == facing ? 'bg-[#396d8c] text-[#f4f5f7]' : 'bg-[#f4f5f7] text-slate-900' }`}
                key={index}
              >
                {facing}
              </motion.button>
            );
          })}
        </div>
    </div>

    <div className='flex flex-col gap-4 mt-4 '>
      <h1 className='text-2xl capitalize flex items-center  gap-2 '>Other Features<span>(Optional)</span></h1>
      <div className="flex gap-4 flex-wrap">
          {otherFeatures.map((feature, index) => {
            return (
              <motion.button
              whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
              onClick={() => {
                if(selectedOtherFeatures.some((item) => item == feature))
                  {
                    const newSelectedOtherFeatures = selectedOtherFeatures.filter((item) => item != feature)
                    setSelectedOtherFeatures(newSelectedOtherFeatures) ;
                    setData((data) => { 
                      {
                        return {
                          ...data , 
                          otherFeatures  : newSelectedOtherFeatures
                        }
                      }


                    })


                  }
                  else{
                    const newSelectedOtherFeatures = [
                      ...selectedOtherFeatures , 
                      feature, 
                    ]
                    setSelectedOtherFeatures(newSelectedOtherFeatures) ;
                    setData((data) => { 
                      {
                        return {
                          ...data , 
                          otherFeatures : newSelectedOtherFeatures
                        }
                      }
                    })


                  }
              }}
                className={`  capitalize  px-3 py-1 rounded-full ${selectedOtherFeatures.some((item) => item == feature ) ? 'bg-[#396d8c] text-[#f4f5f7]' : 'text-slate-900 bg-[#f4f5f7] '}`}
                key={index}
              >
                {feature}
              </motion.button>
            );
          })}
        </div>
    </div>

    <div className='flex flex-col gap-4 mt-4 '>
      <h1 className='text-2xl capitalize flex items-center gap-2  '>flooring Type marble<span>(Optional)</span></h1>
      <div className="flex gap-4 flex-wrap">
          {flooringType.map((flooring, index) => {
            return (
              <motion.button
              whileTap={{scale : .9}} whileHover={{scale : 1.1}}            
              onClick={() => {setSelectedFlooringType(flooring) ; setData((data) => {
                return {
                  ...data , 
                  propertyFlooring : flooring
                }

              })}}
                className={` capitalize  px-3 py-1 rounded-full ${selectedFlooringType == flooring ? 'bg-[#396d8c] text-[#f4f5f7]' : 'text-slate-900 bg-[#f4f5f7] '}`}
                key={index}
              >
                {flooring}
              </motion.button>
            );
          })}
        </div>
    </div>

    <ContinueBtn handlerFunc={handleFunctionOnContinue}/>
    
  </motion.div>
  {/* {loading && <Loader/>} */}
  </>
  )
}

export default AmenitiesSection
