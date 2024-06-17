import {Task} from "../components/ProjectTasks.tsx";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetchTasksByProject = (projectId: number) => {
    return api.get(`/task/by-project/${projectId}`);
}

export const updateTask = (task: Task, userId: number, status: string) => {
    return api.patch(`/task/task/${task.id}?userId=${userId}`, {
        title: task.title,
        description: task.description,
        status: status,
        tags: task.TaskTag.map(tag => tag.tag.id),
    });
}

export const createTask = (title: string, description: string, projectId: number, selectedTags: number[]) => {
    return api.post('/task/create-task?userId=1', {
        title,
        description,
        status: 'Pending',
        projectId,
        tags: selectedTags,
    });
}