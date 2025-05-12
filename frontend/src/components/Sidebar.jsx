import React , {useEffect , useState  , useContext} from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import axios from 'axios' ;
import { toast } from "react-toastify";
import Chatbox from "./Chatbox";
import { propertyContext } from "../context/RealEstateContext";
const Sidebar = () => {
  const tkn = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + tkn,
    },
  };
  
  const [chats , setChats ] = useState([]) ;
  const [id , setId ] = useState('') ;

  const {reRenderSideBar   ,noChats} = useContext(propertyContext) ;




  useEffect(() => {

    ;(async () => { 
      try{
        const response = await axios.get('https://psrealtor.onrender.com/api/v1/chats' , config ); 
        // /api/v1/chats
        console.log('chats = ' , response) ;
        const user  = await axios.get('https://psrealtor.onrender.com/api/v1/user/get/user' , config ) ;
        setId(user?.data?.data?._id) ;
        console.log('userrrr -> ' , user)  ; 
        const newResponse = response?.data?.data ;  
        setChats(newResponse) ;
      }
      catch(err) 
      {
        toast.error("Something went wrong while rendering sidebar") ;
      }
    })() 

    

  } , [reRenderSideBar])  ; 

  return (
    <div className={`flex flex-col   bg-slate-900  shadow-sm items-center    p-3 rounded-xl gap-3  mt-20  w-[20%]`}>
      
      <div className={`overflow-y-scroll flex flex-col gap-4`}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 1 }}
          className=" flex  shadow-sm   items-center gap-3 bg-slate-700 text-gray-200 px-4 py-2 rounded-full "
        >
          <button>
            <CiSearch className="text-3xl" />
          </button>
          <input
            id="search"
            className="bg-transparent text-xl outline-none border-none w-full "
            type="text"
            name="search"
            placeholder="Search"
          />
        </motion.div>

        {/* chats  */}
        {
          chats && chats.length > 0 && 
          <div
            className={` flex  text-gray-200    shadow-sm w-full  h-full rounded-xl overflow-y-scroll p-3 lg:flex flex-col gap-4 `}
          >
  
  
            {
              // render chats here 
              chats && chats.map((chat) => {
               return (
                chat?.sender?._id ==  id ? <Chatbox data = {chat?.receiver} lastMessage = {chat?.lastMessage}  sent ={1} /> : <Chatbox data = {chat?.sender} lastMessage = {chat?.lastMessage} sent = {0} />
               )
  
              })
            }
  
           
          </div>
        }
      </div>
    </div>
  );
};

export default Sidebar;
