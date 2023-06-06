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
