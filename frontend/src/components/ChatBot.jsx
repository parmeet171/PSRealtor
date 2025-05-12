import React  , {useState , useContext} from "react";
import cancel from "../assets/cancel.png";
import { IoMdSend } from "react-icons/io";
import Bot from "./Bot";
import User from "./User";
import { propertyContext } from "../context/RealEstateContext";
const ChatBot = () => {

    
    const {converstation , setConversation , lookingTo, setLookingTo} = useContext(propertyContext)
   

    

  return (
    <div className="absolute bg-[#d4e9f2]  rounded-2xl   bottom-10 right-10 overflow-scroll    w-[20%] h-[60%]  z-10 text-white  ">
      <div className="flex flex-col gap-1 justify-between  h-[100%] p-3  ">
        <div className="p-3 flex items-center justify-between  bg-[#5250c4] rounded-2xl    ">
          {/* heading */}
          <h1 className="text-xl capitalize">chatBot</h1>
          <img className="w-6 " src={cancel} />
        </div>

        <div className="h-full w-full border-2 border-slate-900  text-slate-900  rounded-2xl p-3 flex flex-col gap-3 overflow-auto  ">
          {/* chat area */}
          {
            converstation.map((convo , index ) => {
                if(index % 2 == 0   )
                {
                    return <Bot message = {convo.message} items = {convo.item} />
                }
                else if(index % 2 !== 0 ) 
                {
                    return <User message = {convo} />
                }
            })
          }
          {/* <User/> */}
          
        </div>

        <div className="w-[100%] text-slate-900  border-2 border-slate-900  rounded-xl    flex justify-between items-center ">
          {/* input box  */}
          <input
            className="outline-none bg-transparent  px-2 py-1 "
            placeholder="Type here"
            type="text"
          />
          <span className="text-xl text-slate-900 ">
            <IoMdSend />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
