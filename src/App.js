import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $ from "jquery";

import Login from "./pages/login"
import NoPage from "./pages/NoPage"



export default function App() 
{
  return(
    <></>
    // <div>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route index element = {<Login/>} />
    //       <Route path="/login" element = {<Login/>} />
    //       <Route path="*" element = {<NoPage/>} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  )

}


