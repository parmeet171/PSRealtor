import React , {useState} from "react";
import axios from 'axios' ;
import {toast} from 'react-toastify' ;
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [data , setData]= useState({
        username : "" , 
        password : ""
    })
    const onChangeHandler = (e) => {
       const key = e.target.name ;
       const value = e.target.value ;
       setData((prev) => {
        return {
            ...prev , 
            [key] : value
        }
       })
    }

    const navitateTo = useNavigate() ;

  const onLoginHandler = async (e) => {
    e.preventDefault() ;
    if(data?.username == "" || data?.password =="") 
    {
        toast.error("Invalid credentials") ;
        return ;
    }

    try{
        const response = await axios.post('https://psrealtor.onrender.com/api/v1/admin/login' , data ) ; 
        console.log(response) ; 
        navitateTo('/home') ; 
    }
    catch(err) 
    {
        console.log(err) ;
        toast.error("Something went wrong") ;
        err?.response?.data?.message && toast.error(err?.response?.data?.message) ;


    }



  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 ">
      <div>
        <h1 className="text-5xl my-10 text-center  capitalize  text-[#9cc5d3] ">
          Administrator Login
        </h1>
        <form
          className="bg-[#9cc5d3] rounded-xl flex flex-col gap-4  px-20 py-10  "
          method="post"
        >
          <input
            className="outline-none bg-transparent border-2 px-4 py-2  placeholder:text-slate-900 text-xl text-slate-900  rounded-xl "
            type="text"
            placeholder="Username"
            name = "username" 
            value = {data?.username} 
            onChange={onChangeHandler}
          />
          <input
            className="outline-none bg-transparent border-2 px-4 py-2  placeholder:text-slate-900 text-xl text-slate-900  rounded-xl "
            placeholder="Password"
            type="password"
            name = "password"
            value = {data?.password}
            onChange={onChangeHandler} 
          />
          <button
            onClick={(e) => {
              onLoginHandler(e);
            }}
            className="bg-[#08687e] self-center px-4 py-2 text-white rounded-xl text-xl "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
