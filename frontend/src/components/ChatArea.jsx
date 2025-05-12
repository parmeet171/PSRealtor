import React, { useEffect, useState , useContext  , useRef} from "react";
import { MdDelete } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import Sender from "./Sender";
import Other from "./Other";
import cancel from "../assets/cancel.png";
import { propertyContext } from "../context/RealEstateContext";
import { useNavigate } from "react-router-dom";
const ChatArea = ({ postedBy   , setChatAreaComp}) => {
  const [allMessages, setAllMessages] = useState([]);
  const tkn = localStorage.getItem("accessToken");
  const scroll = useRef();
  const config = {
    headers: {
      Authorization: "Bearer " + tkn,
    },
  };
  const navigateTo = useNavigate() ; 

  const {token , setAuthPage ,socket , reRenderChattingArea , setReRenderChattingArea ,reRenderSideBar  , setReRenderSidebar} = useContext(propertyContext) ;


  useEffect(() => {
    // GET CHATS FROM SERVER AND RENDER
    if(!token)
    {
        toast.error("Please login or register first to chat with owner ") ;
        navigateTo('/') ;
        setAuthPage(true) ;
    }
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/message/${postedBy?._id}`,
          config
        );
        console.log(response)  ; 
        setAllMessages(response?.data?.data) ; 
      } catch (err) {
        console.log(err);

        toast.error("Something went wrong while fetching chats ");
      }
    })();
    
  }, [token , reRenderChattingArea ]);

  useEffect(() => {
    
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

  const onSendMessageHandler = async (e) => {
    // store chats in the database
    e.preventDefault();
    console.log(postedBy?._id);

    const receiver = postedBy?._id;
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
      console.log(response);
      response?.data?.data && setAllMessages((prev) => {
        return [
            ...prev , 
            response?.data?.data 
        ]
      }) ; 

   
      // handling sockets 
    socket?.emit("newMessage"  , response?.data?.data) ;
    socket?.emit("newNotification" , response?.data?.data) ; 
    setReRenderSidebar(!reRenderSideBar) ;
    setReRenderChattingArea(!reRenderChattingArea) ;

    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } 


  
    

  };
  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight;
  } , [allMessages]) ; 

  const [inpMessage, setInpMessage] = useState("");

  return (
    <div className="absolute top-[-50px] left-0 flex items-center justify-center   z-10 h-screen  w-full  ">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: 0.4,
        }}
        className="w-[70%] h-[80vh]   bg-[#e6e7e6] dark:bg-slate-900  p-3 flex flex-col gap-4  box-shadow  rounded-xl    "
        // w-[80%] lg:w-[70%]
      >
        <div onClick={() => {setChatAreaComp(false)} } className="absolute top-[-10px] left-[-10px] ">
            {/* cancel btn  */}
            <img className="w-10" src = {cancel} />
        </div>
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
            {postedBy?.avatar == "" ? <p>{postedBy?.name?.[0]}</p> : <div className='w-10 h-10 rounded-full overflow-hidden  '><img className="object-center"  src = {postedBy?.avatar}/></div> }
            </div>
            <div className="flex flex-col ">
              <p className="capitalize font-medium ">{postedBy?.name} </p>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MdDelete className="text-3xl dark:text-gray-200   text-gray-600" />
          </motion.button>
        </div>

        {/* message container */}

        <div ref={scroll} className="bg-[#f4f5f8] dark:bg-slate-700   shadow-sm  flex flex-col  gap-4  p-3 h-full rounded-xl overflow-y-scroll  ">
          {allMessages.length > 0  && allMessages.map((msg, index) => {
                return msg?.sender?._id == postedBy?._id  ? (
                  <Other
                    key={index}
                    name={msg?.receiver?.name}
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
    </div>
  );
};

export default ChatArea;
