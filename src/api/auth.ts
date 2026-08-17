// src/api/auth.ts
import { apiClient } from './client';
import type {
    InitData,
    LoginResponse,
    RefreshResponse,
    MeResponse,
    User
} from '../types/auth';

export const authAPI = {
    // POST /auth/login - вход через Telegram
    login: async (initData: InitData): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', {
            initData,
        });
        if (response.session_token) {
            apiClient.setToken(response.session_token);
        }
        return response;
    },

    // POST /auth/refresh - обновление сессии
    refresh: async (): Promise<RefreshResponse> => {
        const token = apiClient.getToken();
        if (!token) {
            throw new Error('No token to refresh');
        }
        const response = await apiClient.post<RefreshResponse>('/auth/refresh', {
            session_token: token,
        }, { retryOn401: false });

        if (response.session_token) {
            apiClient.setToken(response.session_token);
        }
        return response;
    },

    // GET /auth/me - информация о пользователе
    me: async (): Promise<User> => {
        const response = await apiClient.get<MeResponse>('/auth/me');
        return response.user;
    },

    // POST /auth/logout - выход
    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout', undefined, { retryOn401: false });
        } finally {
            apiClient.setToken(null);
        }
    },

    // Проверка авторизации
    isAuthenticated: (): boolean => {
        return !!apiClient.getToken();
    },

    // Получить токен
    getToken: (): string | null => {
        return apiClient.getToken();
    },
};