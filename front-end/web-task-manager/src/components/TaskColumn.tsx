import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const ItemTypes = {
    TASK: 'task',
};

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    TaskTag: Array<{ tag: { id: number; title: string } }>;
}

interface TaskColumnProps {
    status: string;
    tasks: Task[];
    onTaskDrop: (taskId: number, status: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, onTaskDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: { id: number }) => {
            onTaskDrop(item.id, status);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className="task-column" style={{ backgroundColor: isOver ? '#f0f0f0' : '#fff' }}>
            <h2>{status}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} id={task.id} title={task.title} description={task.description}
                          tags={task.TaskTag.map(t => t.tag)} createdAt={task.createdAt} />
            ))}
        </div>
    );
};

export default TaskColumn;
