import React, { createContext, useContext, useMemo, useState } from 'react';
import type Role from '../enum/Role';

interface IAuth {
	id: string | null;
	name: string | null;
	role: Role | null;
	isAdmin: boolean;
}

type IAuthContext = [IAuth, React.Dispatch<React.SetStateAction<IAuth>>];

const AuthContext = createContext<IAuthContext>([
	{
		id: null,
		name: null,
		role: null,
		isAdmin: false,
	},
	() => null,
]);

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}

function AuthProvider(props: any) {
	const [auth, setAuth] = useState<IAuth>({
		id: null,
		name: null,
		role: null,
		isAdmin: false,
	});

	const value = useMemo(() => [auth, setAuth], [auth]);

	return <AuthContext.Provider value={value} {...props} />;
}

export { AuthProvider, useAuth };
