import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CreateProjectModal from './CreateProjectModal';
import '../styles/main.css';
import {ProjectContext} from "../context/ProjectContext.tsx";

const Sidebar: React.FC = () => {
    const { user, projects, loadProjects } = useContext(ProjectContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleProjectCreated = () => {
        loadProjects();
    };

    return (
        <div className="sidebar">
            {user && <div className="user-info">{user.name}</div>}
            <ul className="project-list">
                {projects.map(project => (
                    <li key={project.id} className="project-item">
                        <Link to={`/projects/${project.id}`} className="project-link">
                            <div className="project-container">
                                <span className="project-name">{project.name}</span>
                                <span className="task-count">{project.tasksCount}</span>
                            </div>
                        </Link>
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
