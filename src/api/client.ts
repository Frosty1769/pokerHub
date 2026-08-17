// src/api/client.ts
// src/api/client.ts
import type { ErrorResponse } from '../types/auth';

const MAIN_URL = import.meta.env.VITE_MAIN_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
    requiresAuth?: boolean;
    retryOn401?: boolean;
}

class ApiClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    setToken(token: string | null) {
        this.token = token;
        if (token) {
            localStorage.setItem('sessionToken', token);
        } else {
            localStorage.removeItem('sessionToken');
        }
    }

    getToken(): string | null {
        return this.token || localStorage.getItem('sessionToken');
    }

    async request<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const { requiresAuth = true, retryOn401 = true, ...fetchOptions } = options;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': '',
            ...fetchOptions.headers,
        };

        // Добавляем токен если требуется
        if (requiresAuth) {
            const token = this.getToken();
            if (token) {
                // @ts-ignore
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...fetchOptions,
            headers,
        });

        // Если 401 и нужно повторить
        if (response.status === 401 && retryOn401 && this.getToken()) {
            // Пытаемся обновить токен через /auth/refresh
            const refreshed = await this.refreshToken();
            if (refreshed) {
                // @ts-ignore
                headers['Authorization'] = `Bearer ${this.getToken()}`;
                const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
                    ...fetchOptions,
                    headers,
                });
                return this.handleResponse<T>(retryResponse);
            }
        }

        return this.handleResponse<T>(response);
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json();

        if (!response.ok) {
            const error = new Error((data as ErrorResponse).error || 'Request failed');
            (error as any).code = response.status;
            (error as any).data = data;
            throw error;
        }

        return data as T;
    }

    private async refreshToken(): Promise<boolean> {
        try {
            const token = this.getToken();
            if (!token) return false;

            const response = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session_token: token }),
            });

            if (response.ok) {
                const data = await response.json();
                this.setToken(data.session_token);
                return true;
            }

            this.setToken(null);
            return false;
        } catch {
            this.setToken(null);
            return false;
        }
    }

    // GET запрос
    async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    // POST запрос
    async post<T>(endpoint: string, body?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    // PUT запрос
    async put<T>(endpoint: string, body?: any, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    // DELETE запрос
    async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

export const apiClient = new ApiClient(MAIN_URL);