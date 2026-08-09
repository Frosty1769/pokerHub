import { TelegramProvider, useTelegram } from 'telegram-kit';
import { MainPage } from './components/page/MainPage'

export const App = () => {
  return (
    // 1. Оборачиваем всё приложение в провайдер
    // <TelegramProvider options={{ autoExpand: true }}>
    <div className='w-screen flex justify-center items-center bg-amber-950'>
      <MainPage />
    </div>
    // </TelegramProvider>
  );
}