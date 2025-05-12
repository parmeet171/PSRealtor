
import React from "react";
import {Route, Routes } from 'react-router-dom' ;
import Home from "./pages/Home";
import Login from "./pages/Login";
import ViewProperties from "./pages/ViewProperties";
import Users from "./pages/Users";
import MostSearchedProperties from "./pages/MostSearchedProperties";
import MostLikedProperties from "./pages/MostLikedProperties";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path = "/home" element = {<Home/>} ></Route>
        <Route path = "/" element = {<Login/>} ></Route>
        <Route path = "/properties" element = {<ViewProperties/>} ></Route>
        <Route path = "/users" element = {<Users/>} ></Route>
        <Route path = "/most/searched/properties" element = {<MostSearchedProperties/>} ></Route>
        <Route path = "/most/liked/properties" element = {<MostLikedProperties/>} ></Route>
      </Routes>
      
    </div>
  );
}
export default App;
