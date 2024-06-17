import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {fetchProjectDetails, fetchProjects} from "../services/projectService.ts";
import {fetchUser} from "../services/userService.ts";

interface Project {
    id: number;
    name: string;
    tasksCount: number;
}

interface User {
    id: number;
    name: string;
}

interface ProjectContextData {
    user: User | null;
    projects: Project[];
    loadProjects: () => void;
}

interface ProjectProviderProps {
    children: ReactNode;
}

export const ProjectContext = createContext<ProjectContextData>({} as ProjectContextData);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchUser(1).then(response => setUser(response.data));
    }, []);

    const loadProjects = async () => {
        const response = await fetchProjects(0, 10);
        const projectsData = await Promise.all(response.data.data.map(async (project: any) => {
            const details = await fetchProjectDetails(project.id);
            return {
                id: project.id,
                name: project.name,
                tasksCount: details.data.tasksCount,
            };
        }));
        setProjects(projectsData);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ user, projects, loadProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};
