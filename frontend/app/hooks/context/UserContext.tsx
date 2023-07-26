'use client';

import { logoutUser } from '@/app/api/api'; // Ensure the logoutUser function is correctly imported from your API
import { User } from '@/app/types';
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState
} from 'react';

interface UserContextProps {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	logout: () => void;
}

export const UserContext = createContext<UserContextProps>({
	user: null,
	setUser: () => {},
	logout: () => {},
});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	const logout = async () => {
		await logoutUser();
		setUser(null);
		localStorage.removeItem('token');
	};

	console.log('Context User:', user);

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};