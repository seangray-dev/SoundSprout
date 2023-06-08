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
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getSoundsByGenre = async (genreId: number) => {
  try {
    const response = await axios.get(`${BACKEND}/genre/${genreId}/sounds/`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getPackById = async (id: number) => {
  try {
    const response = await axios.get(`${BACKEND}/packs/${id}/`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};