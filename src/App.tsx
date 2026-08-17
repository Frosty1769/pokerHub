// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import { GamePage } from './components/page/GamePage';
import LoginPage from './components/page/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainPage from './components/page/MainPage';

// Ваши существующие страницы

// Импортируйте другие ваши страницы, если они есть
// import HomePage from './pages/HomePage/HomePage';
// import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Публичный маршрут - страница входа */}
          <Route path="/login" element={<LoginPage />} />

          {/* Защищенные маршруты */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />

          {/* Если у вас есть другие страницы, добавьте их */}
          {/*
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          */}

          {/* Редирект на главную для неизвестных маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;