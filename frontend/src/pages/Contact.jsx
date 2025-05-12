import React from "react";
import contact from "../assets/contact.png";

const Contact = () => {
  return (
    <div className="h-screen p-4 flex items-center  bg-[#d4e9f2] ">
      <div className="w-1/2 flex-1 flex p-4   flex-col gap-4 pt-20">
        <h1 className="text-7xl tracking-wide capitalize text-center font-medium text-[#08687e] ">
          Contact us{" "}
        </h1>
        <form
          method="post"
          className="flex items-center gap-4 flex-col w-full  "
        >
          <input
            type="text"
            className="w-1/2 p-4 text-[1rem] placeholder:text-[1rem] placeholder:capitalize outline-none bg-transparent border-[2px] border-slate-900 rounded-xl "
            name="name"
            placeholder="name"
          />
          <input
            className="w-1/2 p-4 text-[1rem] placeholder:text-[1rem] placeholder:capitalize outline-none bg-transparent border-[2px] border-slate-900 rounded-xl "
            type="email"
            name="email "
            placeholder="email"
          />
          <textarea
            className="w-1/2 p-4 text-[1rem] placeholder:text-[1rem] placeholder:capitalize outline-none bg-transparent border-[2px] border-slate-900 rounded-xl "
            rows="5"
            cols="20"
            placeholder="message"
          ></textarea>
          <button className="bg-[#08687e] text-[#f4f5f7] px-10 py-3 text-xl  rounded-xl  ">
            Send
          </button>
        </form>
      </div>
      <div className="w-1/2  bg-[#d4e9f2] ">
        {/* img  */}
        <img className="w-full" src={contact} />
      </div>
    </div>
  );
};

export default Contact;
