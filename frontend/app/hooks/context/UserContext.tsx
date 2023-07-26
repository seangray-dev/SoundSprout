'use client';

import { logoutUser } from '@/app/api/api'; // Ensure the logoutUser function is correctly imported from your API
import { User } from '@/app/types';
import { useRouter } from 'next/navigation'; // Use the useRouter hook
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useEffect,
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
	const router = useRouter(); // Get the router instance

	const logout = async () => {
		await logoutUser();
		setUser(null);
		localStorage.removeItem('token');
		router.push('/login'); // Redirect to login page
	};

	console.log('Context User:', user);

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};
