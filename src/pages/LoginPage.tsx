// src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../components/AuthButton';
import { mockLogin } from '../api/mockAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleLogin = (role: 'GM' | 'Player') => {
    // Моковая аутентификация
    const user = mockLogin(role);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          RPG Platform
        </h1>
        
        <div className="space-y-4">
          <AuthButton 
            color="purple"
            onClick={() => handleLogin('GM')}
            label="Войти как Гейм-мастер"
          />
          
          <AuthButton 
            color="teal"
            onClick={() => handleLogin('Player')}
            label="Войти как Игрок"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;