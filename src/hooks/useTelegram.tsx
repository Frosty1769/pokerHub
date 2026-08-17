// src/hooks/useTelegram.ts
export const useTelegram = () => {
    const tg = window.Telegram?.WebApp;

    return {
        tg,
        user: tg?.initDataUnsafe?.user,
        initData: tg?.initData,
        initDataUnsafe: tg?.initDataUnsafe,
        // Дополнительные полезные поля
        startParam: tg?.initDataUnsafe?.start_param,
        chatType: tg?.initDataUnsafe?.chat_type,
        chatInstance: tg?.initDataUnsafe?.chat_instance,
        // platform: tg?.platform,
        // colorScheme: tg?.colorScheme,
        // themeParams: tg?.themeParams,
    };
};