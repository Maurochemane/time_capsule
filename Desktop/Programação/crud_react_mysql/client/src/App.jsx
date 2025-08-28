import { BrowserRouter,Routes,Route } from "react-router-dom";
import Add from "./pages/add";
import Update from "./pages/update";
import Books  from "./pages/books";
import './App.css'
import React from 'react';

function App() {
 

  return (
   <div>
   
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App
