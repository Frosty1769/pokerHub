// src/pages/LoginPage/LoginPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useAuth } from '../../../hooks/AuthContext';
import { useTelegram } from '../../../hooks/useTelegram';


const LoginPage: React.FC = () => {
    const { login, isAuthenticated, loading } = useAuth();
    const { tg } = useTelegram();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    // Редирект если уже авторизован
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return;
        }

        // Проверяем запущено ли приложение в Telegram
        if (tg) {
            const initDataUnsafe = tg.initDataUnsafe;
            if (initDataUnsafe?.user) {
                // Автоматический вход через Telegram
                handleTelegramLogin(initDataUnsafe);
            } else {
                setError('Не удалось получить данные от Telegram');
            }
        } else {
            console.warn('Приложение запущено вне Telegram Mini App');
        }
    }, [isAuthenticated, navigate]);

    // Обработка входа через Telegram
    const handleTelegramLogin = async (initData: any) => {
        try {
            setError(null);
            await login(initData);
            navigate('/');
        } catch (err) {
            setError('Ошибка входа. Попробуйте перезапустить приложение.');
            console.error('Login error:', err, initData);
            // tg.showAlert('Ошибка входа. Попробуйте перезапустить приложение.');s
        }
    };

    // Тестовый вход для разработки
    const handleTestLogin = async () => {

        const initData = tg.initData
        // const testInitData = {
        //     query_id: 'test_query_id',
        //     user: {
        //         id: 123456789,
        //         first_name: 'Test',
        //         last_name: 'User',
        //         username: 'test_user',
        //         language_code: 'ru',
        //     },
        //     auth_date: Math.floor(Date.now() / 1000).toString(),
        //     hash: 'test_hash',
        // };
        await handleTelegramLogin(initData);
    };

    if (loading) {
        return (
            <div className="login-container">
                <div className="loading-spinner">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>♠️ PokerHub</h1>
                <p>Вход через Telegram</p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* В режиме разработки показываем тестовую кнопку */}
                {!window.Telegram?.WebApp && (
                    <button onClick={handleTestLogin} className="login-button">
                        Тестовый вход (Dev)
                    </button>
                )}

                {/* В Telegram Mini App вход происходит автоматически */}
                {window.Telegram?.WebApp && !loading && !error && (
                    <div className="telegram-info">
                        <p>Идет авторизация через Telegram...</p>
                        <div className="loading-dots">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;