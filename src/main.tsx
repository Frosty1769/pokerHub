// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { useTelegram } from './hooks/useTelegram';

// Объявляем Telegram WebApp для TypeScript
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
        };
        // добавьте другие нужные методы
      };
    };
  }
}

// Инициализация приложения
const root = ReactDOM.createRoot(document.getElementById('root')!);
const { tg } = useTelegram()
// Важно: сначала проверяем наличие Telegram
if (window.Telegram && window.Telegram.WebApp) {
  // Уведомляем Telegram, что приложение готово
  tg.ready();
  // Раскрываем на весь экран (опционально)
  tg.expand();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);