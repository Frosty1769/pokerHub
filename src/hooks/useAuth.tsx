// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import type { User, InitData } from '../types/auth';
import { authAPI } from '../api/auth';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            if (authAPI.isAuthenticated()) {
                const userData = await authAPI.me();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            try {
                await authAPI.refresh();
                const userData = await authAPI.me();
                setUser(userData);
            } catch {
                authAPI.logout();
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (initData: InitData) => {
        setLoading(true);
        try {
            const response = await authAPI.login(initData);
            setUser(response.user);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await authAPI.logout();
        setUser(null);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
    };
}