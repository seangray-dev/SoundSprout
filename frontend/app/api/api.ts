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

export const updateUser = async (userData: any) => {
	const token = localStorage.getItem('token');
	if (!token) {
			throw new Error('Token not found');
	}

	try {
			const response = await axios.put(`${BACKEND}/profile/`, userData, {
					headers: {
							Authorization: `Bearer ${token}`,
					},
			});

			console.log('Update User:', response.data);
			if (response.status === 200) {
					return { success: true, user: response.data };
			} else {
					return { success: false, message: response.data.message };
			}
	} catch (error) {
			if (axios.isAxiosError(error)) {
					throw new Error(error?.response?.data?.error || 'Unknown error');
			}
			throw error;
	}
};

export const deleteUser = async () => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('Token not found');
	}

	await axios.delete(`${BACKEND}/profile/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const changeUserPassword = async (newPassword: string) => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('Token not found');
	}

	console.log('Token:', token);  // For debugging

	try {
		const response = await axios.patch(`${BACKEND}/profile/`, {
			new_password: newPassword,
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log('Response:', response);  // For debugging
		return response;
	} catch (error) {
		console.error('Error changing password:', error);  // Logs the error
		throw error;
	}
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
