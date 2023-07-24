'use client';

import React, { createContext } from 'react';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);
	console.log('Context User:', user);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
