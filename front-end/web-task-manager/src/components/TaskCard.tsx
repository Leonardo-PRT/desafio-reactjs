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
    tags: Tag[];
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, tags }) => {
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
