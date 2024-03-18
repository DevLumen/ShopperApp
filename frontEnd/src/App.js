import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Game from './components/AdminPage/CreateGame/Game';
import GameList from './components/AdminPage/ViewGames/GameList';
import Splash from './components/SplashPage/Splash';

// Outlet

function App() {
  return ( 
    <div className="w-full p-6">
      <Navbar/>
        <Routes>
          <Route path="/" element={<GameList/>}/>
          <Route path="/create" element={<Game/>}/>
          <Route path="/register" element={<Splash/>}/>
        </Routes>
    </div>
  );
}

export default App;