'use client';

import React, { createContext, ReactNode } from 'react';

export const UserContext = createContext({});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = React.useState(null);
	console.log('Context User:', user);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
