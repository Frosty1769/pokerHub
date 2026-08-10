import { TelegramProvider, useTelegram } from 'telegram-kit';
import { MainPage } from './components/page/MainPage'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Path } from './enum/Path';
import { GamePage } from './components/page/GamePage';
import Button from './input/Button';
import AuthPage from './components/page/AuthPage';
import { Check, Logout } from './api/functions';
import { useEffect } from 'react';
import type { ResponseContainer } from './api/base';
import type { AuthOut } from './interfaces/Auth';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import { CreateGamePage } from './components/page/CreateGamePage';

function InnerApp() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // const [isChecked, setIsChecked] = useState<boolean>(false);

  const onAuth = (data: AuthOut) => {
    setAuth({
      id: data.id,
      role: data.role,
      name: data.name,
      isAdmin: false,
    });
    if (path === Path.Auth) {
      navigate('/', { replace: true });
    }
  };

  const onLogout = () => {
    Logout(() => {
      setAuth({
        id: null,
        name: null,
        role: null,
        isAdmin: false,
      });
      navigate('/', { replace: true });
    });
  };

  useEffect(() => {
    Check((resp: ResponseContainer<AuthOut>) => {
      // setIsChecked(true);
      if (resp.status === 'ok') if (resp.data) onAuth(resp.data);
    });
  }, []);

  // const Layout = () => {
  // 	return (
  // 		<>
  // 			<Header onLogout={onLogout} />
  // 			<div className='flex w-full min-w-[1280px] flex-1 flex-col overflow-hidden bg-white'>
  // 				<Outlet />
  // 			</div>
  // 		</>
  // 	);
  // };

  return (
    <>
      <Routes>
        {auth.role === null ? (
          <>
            <Route path={Path.Auth} element={<AuthPage onAuth={onAuth} />} />
            <Route
              path='*'
              element={<Navigate to={Path.Auth} replace={true} />}
            />
          </>) : (
          <>
            <Route path={Path.Home} element={<MainPage />} />
            <Route path={Path.Game} element={<GamePage />} />
            <Route path={Path.CreateGame} element={<CreateGamePage />} />
            <Route
              path='*'
              element={<Navigate to={Path.Home} replace></Navigate>}
            />
          </>)}
      </Routes>
    </>)
}

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
