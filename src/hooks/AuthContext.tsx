// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, InitData } from '../types/auth';
import { authAPI } from '../api/auth';

interface AuthContextType {
	user: User | null;
	loading: boolean;
	isAuthenticated: boolean;
	login: (initData: InitData) => Promise<void>;
	logout: () => Promise<void>;
	refreshSession: () => Promise<void>;
	checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Проверка авторизации при загрузке
	const checkAuth = async () => {
		try {
			if (authAPI.isAuthenticated()) {
				const userData = await authAPI.me();
				setUser(userData);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error('Auth check failed:', error);
			// Если проверка не удалась - пробуем обновить
			await refreshSession();
		} finally {
			setLoading(false);
		}
	};

	// Обновление сессии
	const refreshSession = async () => {
		try {
			const response = await authAPI.refresh();
			setUser(response.user);
		} catch (error) {
			// Если рефреш не удался - выходим
			await logout();
		}
	};

	// Вход
	const login = async (initData: InitData) => {
		setLoading(true);
		try {
			const response = await authAPI.login(initData);
			setUser(response.user);
		} catch (error) {
			console.error('Login failed:', error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// Выход
	const logout = async () => {
		await authAPI.logout();
		setUser(null);
	};

	// Проверяем авторизацию при монтировании
	useEffect(() => {
		checkAuth();
	}, []);

	const value = {
		user,
		loading,
		isAuthenticated: !!user,
		login,
		logout,
		refreshSession,
		checkAuth,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};