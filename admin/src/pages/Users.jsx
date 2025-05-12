import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import noImage from "../assets/no-image.png";
import deleteImg from "../assets/delete.png";
import PropertyPostedCount from "../components/PropertyPostedCount";
const Users = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://psrealtor.onrender.com/api/v1/admin/users"
      );
      setUsers(response?.data?.data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong : while fetching all users");
    }
  }
  useEffect(() => {
    (async () => {await getAllUsers() })()
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://psrealtor.onrender.com/api/v1/admin/user/${id}`
      );
      console.log(response);
      toast.success("User deleted");
    } catch (err) {
      toast.error("Something went wrong : while deleting user");
      console.log(err);
    }
  };

  const getOwners  = async () => {
    try{
      const response = await axios.get(
        `https://psrealtor.onrender.com/api/v1/admin/get/owners`
      );
      console.log(response);
      setUsers(response?.data?.data) ;

    }
    catch(err) 
    {
      toast.error("Something went wrong : while fetching  owners ");
      console.log(err);
    }
  }

  const getBuilders   = async () => {
    try{
      const response = await axios.get(
        `https://psrealtor.onrender.com/api/v1/admin/get/builders`
      );
      console.log(response);
      setUsers(response?.data?.data) ;


    }
    catch(err) 
    {
      toast.error("Something went wrong : while fetching  builders ");
      console.log(err);
    }
  }

  const getDealers = async () => {
    try{
      const response = await axios.get(
        `https://psrealtor.onrender.com/api/v1/admin/get/dealers`
      );
      console.log(response);
      setUsers(response?.data?.data) ;

    }
    catch(err) 
    {
      toast.error("Something went wrong : while fetching  dealers ");
      console.log(err);
    }
  }


  return (
    <div className="bg-slate-900 text-[#e8eaf6] px-10 py-20  flex  w-[100vw] ">
      <div className="flex flex-col gap-10  w-full ">
        <h1 className="capitalize text-5xl ">All users : </h1>

        <div className="flex gap-4 ">
        <button onClick={getBuilders} className="px-4 py-2 rounded-2xl bg-[#e8eaf6] text-slate-900 ">Builders</button>
        <button onClick={getDealers} className="px-4 py-2 rounded-2xl bg-[#e8eaf6] text-slate-900 ">Dealers</button>
        <button onClick={getOwners} className="px-4 py-2 rounded-2xl bg-[#e8eaf6] text-slate-900 ">Owners</button>
        <button onClick={async () => {await getAllUsers() }} className="px-4 py-2 rounded-2xl bg-[#e8eaf6] text-slate-900 ">All</button>
        </div>

      

        {users &&
          users.map((user, index) => {
            return (
              <div
                className="bg-[#123f67] relative flex gap-4 px-5 py-10 rounded-2xl  flex-wrap w-full items-center  "
                key={index}
              >
                <div
                  onClick={() => {
                    deleteUser(user?._id);
                  }}
                  className="absolute right-5 top-10 cursor-pointer "
                >
                  <img className="w-10" src={deleteImg} />
                </div>

                {user?.avatar == "" ? (
                  <div className="rounded-full overflow-hidden">
                    {" "}
                    <div><img className="w-20  " src={noImage} /></div>{" "}
                  </div>
                ) : (
                  <div className="w-20 h-20 overflow-hidden rounded-full  "><img className="object-cover" src={user?.avatar} /></div>
                )}
                <div className="flex items-center gap-4 ">
                  <p className="text-2xl capitalize ">name : </p>
                  <p className="text-2xl capitalize">{user?.name}</p>
                </div>

                <div className="h-10 w-[2px] bg-slate-100">
                  |
                </div>

                <div className="flex items-center gap-4 ">
                  <p className="text-2xl capitalize ">email : </p>
                  <p className="text-2xl capitalize">{user?.email}</p>
                </div>
                <div className="h-10 w-[2px] bg-slate-100">
                  |
                </div>

                {user?.number && (
                  <div className="flex items-center gap-4  ">
                    <p className="text-2xl capitalize ">number : </p>
                    <p className="text-2xl capitalize">{user?.number}</p>
                  </div>
                )}
                <div className="h-10 w-[2px] bg-slate-100">
                  |
                </div>

                <PropertyPostedCount id = {user?._id} />
                
                <div className="h-10 w-[2px] bg-slate-100">
                  |
                </div>

                {user?.role && (
                  <div className="flex items-center gap-4 ">
                    <p className="text-2xl capitalize ">Role : </p>
                    <p className="text-2xl capitalize">{user?.role}</p>
                  </div>
                )}
              </div>
            );
          })}

          
      </div>
    </div>
  );
};

export default Users;
