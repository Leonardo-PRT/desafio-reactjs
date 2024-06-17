import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
    TASK: 'task',
};

interface Tag {
    id: number;
    title: string;
}

interface TaskCardProps {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    tags: Tag[];
}

const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
};

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, tags , createdAt}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className="task-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h3>{title}</h3>
            <p>{formatDate(createdAt)}</p>
            <p>{description}</p>
            <div className="task-tags">
                {tags.map((tag) => (
                    <span key={tag.id} className="task-tag">{tag.title}</span>
                ))}
            </div>
        </div>
    );
};

export default TaskCard;
