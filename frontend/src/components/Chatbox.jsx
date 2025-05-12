import React , {useContext} from 'react'
import { propertyContext } from '../context/RealEstateContext' ; 

const Chatbox = ({data , lastMessage , sent }) => {
  const { setChattingAreaComp , setWelcomeChatComp, setCurrentChatWith } = useContext(propertyContext) ;


  const onClickHandler  = () => {
    setWelcomeChatComp(false) ;
    const newData = data; 
    setCurrentChatWith(newData) ;
    setChattingAreaComp(true) ; 
  }
  return (
    <div onClick={onClickHandler } className='flex gap-4  bg-slate-700 p-3 rounded-2xl '>
        <div  className="bg-gray-300 w-10 h-10 flex items-center capitalize  font-extrabold justify-center rounded-full text-slate-900  ">
        {data?.name[0]}
      </div>

      <div className="flex flex-col  ">
        <p className="capitalize font-medium">{data?.name}</p>
        <div className="flex tems-center gap-2  ">
          <p
            className={`text-sm capitalize 0`}
          >
            {sent == 1 ? 'You' : data?.name }: {lastMessage?.length > 8 ? lastMessage.substring(0 , 8 ) + "..." : lastMessage  }
          </p>
          
        </div>
      </div>

    </div>
  )
}

export default Chatbox
