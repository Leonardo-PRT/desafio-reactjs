// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProjectTasks from './components/ProjectTasks';
import './styles/main.css';
import {ProjectProvider} from "./context/ProjectContext.tsx";

const App: React.FC = () => {
    return (
        <ProjectProvider>
            <Router>
                <div className="app-container">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<div>Página Principal</div>} />
                        <Route path="/projects/:id" element={<ProjectTasks />} />
                    </Routes>
                </div>
            </Router>
        </ProjectProvider>
    );
};

export default App;
