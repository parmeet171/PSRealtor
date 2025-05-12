import React , {useState , useEffect ,  useContext , useRef} from 'react'
import {motion , AnimatePresence} from 'framer-motion' ; 
import axios from 'axios' ;
import { propertyContext } from '../context/RealEstateContext';
import {toast} from 'react-toastify' ;
import { MdDelete } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import Sender from "./Sender";
import Other from "./Other";
import { IoSend } from "react-icons/io5";
const ChattingArea = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [inpMessage, setInpMessage] = useState("");
  const scroll = useRef();
  const tkn = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + tkn,
    },
  };
  const {currentChatWith , socket , reRenderChattingArea , setReRenderChattingArea ,reRenderSideBar  , setReRenderSidebar } = useContext(propertyContext) ; 
  useEffect(() => {
    console.log('socket value = '  ,  socket) ;
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/message/${currentChatWith?._id}`,
          config
        );
        console.log(response)  ; 
        setAllMessages(response?.data?.data) ; 

      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while fetching chats ");
      }
    })();
  } , [currentChatWith  , reRenderChattingArea    ] ) ; 
  useEffect(() => {
    console.log()
    // handling sockets on receiving side 
    socket?.on("messageReceived" , (message) => {
      console.log("message received from the server ") ;
      setReRenderChattingArea(!reRenderChattingArea) ;
      setReRenderSidebar(!reRenderSideBar) ;
    })
    return () => {
      socket?.off("messageReceived") ;
    }
  } ) ;

  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight;
  } , [allMessages]) ; 


  const onSendMessageHandler = async (e) => {
    // store chats in the database
    e.preventDefault();
    
    const receiver = currentChatWith?._id;
    setInpMessage("") ;
    const data = {
      message: inpMessage,
      receiver,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/message/",
        data,
        config
      );
      toast.success("Message sent") ;
      response?.data?.data && setAllMessages((prev) => {
        return [
            ...prev , 
            response?.data?.data 
        ]

      }) ; 
      console.log("socket value  = " , socket)  ; 

      // handling sockets on sending side 
      socket?.emit("newMessage"  , response?.data?.data) ; 
      socket?.emit("newNotification" , response?.data?.data) ;
      
      setReRenderSidebar(!reRenderSideBar) ;
      setReRenderChattingArea(!reRenderChattingArea) ;

    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };


  return (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: 0.4,
        }}
        className="w-[80%] mt-20     bg-[#e6e7e6] dark:bg-slate-900  p-3 flex flex-col gap-4    rounded-xl    "
        // w-[80%] lg:w-[70%]
      >
        {/* header */}
        <div className="w-full shadow-sm   p-3 items-center gap-x-3 flex justify-between bg-[#f4f5f8] dark:bg-slate-700 dark:text-gray-200    rounded-xl   ">
          <div className=" flex gap-4 items-center  ">
            <div className="block lg:hidden">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {}}
                className="hover:bg-gray-200 rounded-full transition-all ease-in-out p-1 dark:hover:bg-slate-600 "
              >
                <IoArrowBack className="text-xl" />
              </motion.button>
            </div>
            <div className="bg-gray-300 dark:text-slate-900  w-10 h-10 flex items-center justify-center rounded-full capitalize font-extrabold  ">
              {currentChatWith?.avatar == "" ? <p>{currentChatWith?.name?.[0]}</p> : <div className='w-10 h-10 rounded-full overflow-hidden  '><img className="object-center"  src = {currentChatWith?.avatar}/></div> }
            </div>
            <div className="flex flex-col ">
              <p className="capitalize font-medium ">{currentChatWith?.name} </p>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MdDelete className="text-3xl dark:text-gray-200   text-gray-600" />
          </motion.button>
        </div>

        {/* message container */}

        <div  ref={scroll} className="bg-[#f4f5f8] dark:bg-slate-700   shadow-sm  flex flex-col  gap-4  p-3 h-full rounded-xl overflow-y-scroll  ">
          
          {allMessages.length > 0  && allMessages.map((msg, index) => {
                return msg?.sender?._id == currentChatWith?._id  ? (
                  <Other
                    key={index}
                    name={msg?.sender?.name}
                    text={msg?.message}
                    // time={moment(msg.createdAt).format("hh:mm")}
                  />
                ) : (
                  <Sender
                    key={index}
                    text={msg?.message}
                    // time={moment(msg.createdAt).format("hh:mm")}
                  />
                );
              })}
        </div>

        {/* message type here */}

        <div className="flex dark:bg-slate-700  justify-between shadow-sm  items-center bg-[#f4f5f8] p-3 rounded-xl  ">
          <input
            className="outline-none border-none bg-transparent text-xl w-full dark:text-gray-200 "
            type="text"
            placeholder="Type here"
            value={inpMessage}
            onChange={(e) => {
              setInpMessage(e.target.value);
            }}
          />
          <motion.button
            className={`${inpMessage == "" ? "hidden" : "block"}`}
            onClick={onSendMessageHandler}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            type="button"
          >
            <IoSend className="dark:text-gray-200 " />
          </motion.button>
        </div>
      </motion.div>
  )
}

export default ChattingArea
