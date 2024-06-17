import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskColumn from './TaskColumn';
import CreateTaskModal from './CreateTaskModal';
import { fetchTasksByProject, updateTask } from "../services/taskService";

export interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    status: string;
    TaskTag: Array<{ tag: { id: number; title: string } }>;
}

export const ProjectTasks: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetchTasksByProject(Number(id));
                setTasks(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
                setError("Erro ao buscar tarefas.");
                setLoading(false);
            }
        };
        fetchTasks();
    }, [id]);

    const handleTaskDrop = async (taskId: number, newStatus: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) {
            return;
        }
        try {
            await updateTask(task, 1, newStatus);
            const response = await fetchTasksByProject(Number(id));
            setTasks(response.data.data);
        } catch (error) {
            console.error("Erro ao atualizar a tarefa:", error);
        }
    };

    const renderTasksByStatus = (status: string) => {
        return tasks.filter(task => task.status === status);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTaskCreated = () => {
        const fetchTasks = async () => {
            try {
                const response = await fetchTasksByProject(Number(id));
                setTasks(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas após criação:", error);
            }
        };
        fetchTasks();
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="task-board-container">
                <button className="new-task-button" onClick={handleOpenModal}>+ Nova task</button>
                <div className="task-board">
                    <TaskColumn status="Pending" tasks={renderTasksByStatus('Pending')} onTaskDrop={handleTaskDrop} />
                    <TaskColumn status="InProgress" tasks={renderTasksByStatus('InProgress')} onTaskDrop={handleTaskDrop} />
                    <TaskColumn status="Done" tasks={renderTasksByStatus('Done')} onTaskDrop={handleTaskDrop} />
                </div>
                <CreateTaskModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    onTaskCreated={handleTaskCreated}
                    projectId={Number(id)}
                />
            </div>
        </DndProvider>
    );
};

export default ProjectTasks;
