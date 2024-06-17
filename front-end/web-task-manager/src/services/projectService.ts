import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
});


export const fetchProjects = (page: number, size: number) => {
    return api.get(`/project`, { params: { page, size } });
};

export const fetchProjectDetails = (projectId: number) => {
    return api.get(`/project/${projectId}`);
};

export const createProject = (ownerId: number, name: string, description: string) => {
    return api.post('/project', {
        ownerId: ownerId,
        name: name,
        description: description,
    });
}