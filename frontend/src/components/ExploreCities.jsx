import React , {useState} from 'react'
import {motion} from 'framer-motion' ;

const ExploreCities = () => {

    const [cities , setCities] = useState([
        {name : 'Delhi / NCR' , propertyCount : '132000+' , img  :  'https://mediacdn.99acres.com/media1/11848/1/236961707D-1594715125517.jpg'} ,
        {name : 'Bangalore' , propertyCount : '29000+' , img : 'https://mediacdn.99acres.com/media1/11846/12/236932009D-1594709336922.jpg'} ,
        {name : 'Pune' , propertyCount : '28000+'  , img : 'https://mediacdn.99acres.com/media1/16807/3/336143474D-1640587363487.jpg'} , 
        {name : 'Chennai' , propertyCount : '28000+' , img : 'https://mediacdn.99acres.com/media1/11848/0/236960749D-1594714810078.jpg'} ,
        {name : 'Mumbai' , propertyCount : '30000+' , img : 'https://mediacdn.99acres.com/media1/11848/15/236975527D-1594718126587.jpg'} , 
        {name : 'Hyderabad' , propertyCount : '16000+' , img : 'https://mediacdn.99acres.com/media1/20718/6/414366500D-1679814327585.jpg'} , 
        {name : 'Kolkata' , propertyCount : '19000+' , img : 'https://mediacdn.99acres.com/media1/11848/13/236973031D-1594717541096.jpg'} , 
        {name : 'Ahmadabad' , propertyCount : '15000+' ,img : 'https://imagecdn.99acres.com/media1/24073/2/481462274D-1711002313632.jpg'}
    ])


  return (
    <div className=' p-4 h-[100%] bg-slate-900 text-[#f4f5f7] flex  items-center justify-center '>
        <motion.div initial ={{opacity : 0, scale : 1.2  }} whileInView = {{opacity : 1 , scale : 1 }} transition={{duration : 1 , ease : 'easeInOut' }} className='w-[70%] flex flex-col gap-10'>
        <div className='flex flex-col gap-4'>
            <p className='text-sm text-gray-400 '>TOP CITIES</p>
            <h1 className='text-[#f4f5f7] font-medium text-5xl '>Explore Real Estate in Popular Indian Cities</h1>
        </div>

        <div className='grid grid-cols-3 gap-x-6 gap-y-6 '>
            {
                cities.map((city  , index ) => { 
                    return <>
                    <motion.div key = {index}  whileHover = {{scale : 1.01}} className='flex items-center gap-4  rounded-xl p-4 bg-[#396d8c]'>
                        <motion.img whileHover = {{scale : 1.09}}  className='w-40 rounded-md overflow-hidden ' src = {city.img} />
                        <div className='flex flex-col  gap-2'>
                            <p className='text-xl font-medium '>{city.name}</p>
                            <p>{city.propertyCount}</p>
                        </div>
                    </motion.div>
                
                    </>

                })
            }
        </div>
        </motion.div>
      
    </div>
  )
}

export default ExploreCities
