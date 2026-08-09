import { TelegramProvider, useTelegram } from 'telegram-kit';
import { MainPage } from './components/page/MainPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Path } from './enum/Path';
import { GamePage } from './components/page/GamePage';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* {auth.role !== null && <Button className='absolute !w-5 !h-8 rounded-full right-4 top-4' onClick={() => onLogout()}>Выйти</Button>} */}
        <Routes>
          <Route path={Path.Home} element={<MainPage />} />
          <Route path={Path.Game} element={<GamePage />} />
          <Route
            path='*'
            element={<Navigate to={Path.Home} replace></Navigate>}
          />
        </Routes>
      </BrowserRouter>
    </>)
}