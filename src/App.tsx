// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GameRoomPage from './pages/GameRoomPage';
import JoinGamePage from './pages/JoinGamePage';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/game/:id" element={<GameRoomPage />} />
          <Route path="/join/:gameId" element={<JoinGamePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;