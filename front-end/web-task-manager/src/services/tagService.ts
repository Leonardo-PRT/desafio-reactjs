import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getAll = () => {
    return api.get('/tag?page=0&size=10');
}