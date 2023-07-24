'use client';

import { User } from '@/app/types';
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
} from 'react';

interface UserContextProps {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps>({
	user: null,
	setUser: () => {},
});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = React.useState<User | null>(null);
	console.log('Context User:', user);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
