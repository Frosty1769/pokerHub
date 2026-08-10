import { useState } from "react";
import type { AuthIn, AuthOut } from "../../interfaces/Auth";
import { useNavigate } from "react-router-dom";
import { Login, Register } from "../../api/functions";
import Typography from "../../Typography";
import TextBox from "../../input/TextBox";
import Button from "../../input/Button";


interface Props {
    onAuth(data: AuthOut): void;
}

const AuthPage = (props: Props) => {
    const [userInfo, setUserInfo] = useState<AuthIn>({ username: '', password: '' });
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const onLogin = () => {
        Login(userInfo, (res) => {
            if (res.status === 'ok' && res.data) {
                props.onAuth(res.data);
            } else {
                setError(res.message)
            }
        })
    }
    const onRegister = () => {
        Register(userInfo, (res) => {
            if (res.status === 'ok') {
            } else {
                setError(res.message)
            }
        })
    }

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-[300px] flex flex-col p-6 rounded-lg bg-white border gap-6'>
                <Typography size='h2'>Логин</Typography>
                <div className='flex flex-col gap-4 w-full'>
                    <TextBox
                        error={error !== undefined}
                        description={error}
                        placeholder='Логин'
                        value={userInfo.username}
                        onChange={(e) => {
                            setUserInfo({ ...userInfo, username: e.target.value })
                            if (error) setError(undefined);
                        }}
                    />
                    <TextBox
                        type={'password'}
                        placeholder='Пароль'
                        value={userInfo.password}
                        onChange={(e) => {
                            setUserInfo({ ...userInfo, password: e.target.value })
                            if (error) setError(undefined);
                        }}
                    />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <Button className='mt-4' onClick={() => onLogin()}>
                        <Typography size='h4'>Войти</Typography>
                    </Button>
                    <Button onClick={() => onRegister()}>
                        <Typography size='h4'>Зарегистрировать</Typography>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;