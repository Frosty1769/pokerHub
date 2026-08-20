// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import LoginPage from './components/page/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainPage from './components/page/MainPage';
import SecretPage from './components/page/SecretPage';
import AccountPage from './components/page/AccountPage';
import GamePage from './components/page/GamePage';
import RatingPage from './components/page/RatingPage';


function App() {
  const isDev = import.meta.env.VITE_HOST == "dev"
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
              !isDev ?
                (<ProtectedRoute>
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/game/:id" element={<GamePage />} />
                  <Route path="/rating" element={<RatingPage />} />
                  <Route path="/" element={<MainPage />} />
                </ProtectedRoute>) :
                (<RatingPage />)
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
          {!isDev && <Route path="*" element={<Navigate to="/" replace />} />}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;