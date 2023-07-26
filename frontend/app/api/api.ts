import { Pack } from '@/app/types';
import axios from 'axios';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export const fetchUser = async () => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('Token not found');
	}

	const response = await axios.get(`${BACKEND}/profile/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	console.log('Fetch User:', response.data);
	return response.data;
};

export const getPacksByGenre = async (genreId: number) => {
	try {
		const response = await axios.get(`${BACKEND}/genre/${genreId}/packs/`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error?.response?.data?.error || 'Unknown error');
		}
		throw error;
	}
};

export const getSoundsByGenre = async (genreId: number) => {
	try {
		const response = await axios.get(`${BACKEND}/genre/${genreId}/sounds/`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error?.response?.data?.error || 'Unknown error');
		}
		throw error;
	}
};

export const getPackById = async (id: number): Promise<Pack> => {
	try {
		const response = await axios.get<Pack>(`${BACKEND}/packs/${id}/`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error?.response?.data?.error || 'Unknown error');
		}
		throw error;
	}
};

export const logoutUser = async () => {
	const token = localStorage.getItem('token');

	// Only make the request if the token exists
	if (token) {
		try {
			await axios.post(`${BACKEND}/logout/`, {}, {
				headers: { 'Authorization': `Bearer ${token}` } // or `Token ${token}` if using TokenAuthentication
			});
		} catch (error) {
			console.error('Failed to log out on the server:', error);
		}
	} else {
		console.error('No token found, cannot log out');
	}

	// Always remove the token
	localStorage.removeItem('token');
};

