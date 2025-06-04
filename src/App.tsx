// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import GameRoomPage from "./pages/GameRoomPage";
import GMConsolePage from "./pages/GMConsolePage";
import GameAccessPanelPage from "./pages/GameAccessPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/game/:id" element={<GameRoomPage />} />
          <Route path="/game/:id/gm-console" element={<GMConsolePage />} />
          <Route
            path="/game/:id/agame-access-panel"
            element={<GameAccessPanelPage />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
