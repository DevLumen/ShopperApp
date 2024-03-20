import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from './components/AdminPage/CreateGame/Game';
import GameList from './components/AdminPage/ViewGames/GameList';
import Splash from './components/SplashPage/Splash';
import Register from './components/SplashPage/Register';
import Home from './components/ProductPage/Home';
import Login from './components/SplashPage/Login';

// Outlet

function App() {
  
  return ( 
    <div className="w-full p-6">
      <Navbar/>
        <Routes>
          <Route path="/" element={<GameList/>}/>
          <Route path="/create" element={<Game/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/splash" element={<Splash/>}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
    </div>
  );
}

export default App;