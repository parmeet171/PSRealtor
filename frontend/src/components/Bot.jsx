import React , {useState ,useContext} from 'react'
import botImg from '../assets/technical-support.png'; 
import { propertyContext } from "../context/RealEstateContext";
const Bot = ({message , items}) => {
    const [messageCount , setMessageCount] = useState(1) ; 
    const [lookingTo, setLookingTo] = useState(["Sell", "Rent", "PG"]);
    const [selectedValue , setSelectedValue] = useState('') ;
    const [propertyType, setPropertyType] = useState([
        "Flat/Apartment",
        "Independent/Builder Floor",
        "Independent House/Villa",
        "1RK /Studio Apartment",
        "Serviced Apartments",
        "Plot/Land",
        "Farm House",
      ]);

      const {converstation , setConversation } = useContext(propertyContext)
    
  return (
    <div className='flex flex-col self-start gap-4   '>
       
        { <div className='flex gap-4 items-start bg-[#cdd5d7]  px-1 py-2 rounded-lg'>
            <img className='w-4 h-4 '  src = {botImg} />
            {
                <div  className='flex flex-col gap-2'>
                    <h1>{message}</h1>
                    <div className='flex gap-4 flex-wrap'>
                    {
                        items?.map((item) => {
                            return <button onClick={() => {setConversation((prev) => {
                                return [
                                    ...prev , 
                                    item 
                                ]
                            })}}  className='px-2 py-1 bg-[#9cc5d3] text-slate-900 rounded-full'>{item}</button>
                        })
                    }
                    </div>
                    </div>
            }
        </div>}
        
    </div>
  )
}

export default Bot
