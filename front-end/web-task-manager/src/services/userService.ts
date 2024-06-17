import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetchUser = (userId: number) => {
    return api.get(`/user/${userId}`);
};
