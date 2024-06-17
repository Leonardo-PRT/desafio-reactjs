import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProjectModal from './CreateProjectModal';
import '../styles/main.css';
import { ProjectContext } from "../context/ProjectContext.tsx";

const Sidebar: React.FC = () => {
    const { user, projects, loadProjects } = useContext(ProjectContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleProjectCreated = () => {
        loadProjects();
    };

    const handleProjectClick = (projectId: number) => {
        navigate(`/projects/${projectId}`);
        window.location.reload();
    };

    return (
        <div className="sidebar">
            {user && <div className="user-info">{user.name}</div>}
            <ul className="project-list">
                {projects.map(project => (
                    <li key={project.id} className="project-item">
                        <div className="project-link" onClick={() => handleProjectClick(project.id)}>
                            <div className="project-container">
                                <span className="project-name">{project.name}</span>
                                <span className="task-count">{project.tasksCount}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="new-project-button" onClick={handleOpenModal}>+ Novo projeto</button>
            <CreateProjectModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onProjectCreated={handleProjectCreated}
            />
        </div>
    );
};

export default Sidebar;
