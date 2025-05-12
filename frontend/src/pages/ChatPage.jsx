import React , {useContext , useEffect  , useState } from 'react'
import Sidebar from '../components/Sidebar'; 
import ChatArea from '../components/ChatArea';
import WelcomeChat from '../components/WelcomeChat';
import { propertyContext } from '../context/RealEstateContext';
import ChattingArea from '../components/ChattingArea';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'; 
import axios from 'axios' ;


const ChatPage = () => {
  const {welcomeChatComp ,chattingAreaComp ,token , setAuthPage  } = useContext(propertyContext) ;
  const tkn = localStorage.getItem("accessToken");
  const [noChats , setNoChats ] = useState(false) ; 
  const navigateTo = useNavigate() ; 
  useEffect(() => {
    if(!tkn)
      {
          toast.error("Please login or register first to chat with owner ") ;
          navigateTo('/') ;
          setAuthPage(true) ;
      }
      const config = {
        headers: {
          Authorization: "Bearer " + tkn,
        },
      };

    (async () => {
      try {
        const response = await axios.get(
          `https://psrealtor.onrender.com/api/v1/chats`,
          config
        );
        if(response?.data?.data?.length == 0 ) {setNoChats(true)} ;
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while fetching chats");
      }
    })();
  } , [token] ) ;

  return (
    <div className='h-screen flex justify-between '>
         { !noChats &&  <Sidebar/>}
         {welcomeChatComp && <WelcomeChat noChats = {noChats} />}
        { chattingAreaComp && <ChattingArea/> }
    </div>
  )
}

export default ChatPage
