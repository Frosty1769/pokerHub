// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Показываем загрузку пока проверяется авторизация
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Загрузка...</div>
            </div>
        );
    }

    // Если не авторизован - редирект на логин
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Если авторизован - показываем контент
    return children;
};

export default ProtectedRoute;