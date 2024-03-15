import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from './components/Game';
// Outlet

function App() {
  return ( 
    <div className="w-full p-6">
      <Navbar/>
        <Routes>
          <Route path="/"/>
          <Route path="/create" element={<Game/>}/>
        </Routes>
    </div>
  );
}

export default App;