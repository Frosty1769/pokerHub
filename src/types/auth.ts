// src/types/auth.ts

export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
}

export interface InitData {
    query_id: string;
    user: TelegramUser;
    auth_date: string;
    hash: string;
    start_param?: string;
    chat_type?: string;
    chat_instance?: string;
}

export interface User {
    id: number;
    telegram_id: string;
    username: string | null;
    first_name: string;
    last_name: string | null;
    photo_url: string | null;
    is_active: boolean;
}

export interface LoginResponse {
    session_token: string;
    user: User;
    expires_at: string;
}

export interface RefreshResponse {
    session_token: string;
    refreshed: boolean;
    expires_at: string;
    user: User;
}

export interface MeResponse {
    user: User;
    session_token: string;
}

export interface ErrorResponse {
    error: string;
    code: number;
}