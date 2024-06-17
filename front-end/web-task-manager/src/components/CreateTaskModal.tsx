import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {getAll} from "../services/tagService.ts";
import {createTask} from "../services/taskService.ts";

Modal.setAppElement('#root');

interface Tag {
    id: number;
    title: string;
}

interface CreateTaskModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onTaskCreated: () => void;
    projectId: number;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onRequestClose, onTaskCreated, projectId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getAll();
                setTags(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar tags:", error);
            }
        };

        fetchTags();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createTask(title, description, projectId, selectedTags);
            onTaskCreated();
            onRequestClose();
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
        }
    };

    const toggleTagSelection = (tagId: number) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tagId)
                ? prevSelectedTags.filter((id) => id !== tagId)
                : [...prevSelectedTags, tagId]
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Criar Task"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <h2>Criar Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Título"
                    />
                </div>
                <div>
          <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Descrição"
          />
                </div>
                <div>
                    <label>Adicionar Tag</label>
                    <div className="tags-container">
                        {tags.map((tag) => (
                            <button
                                type="button"
                                key={tag.id}
                                onClick={() => toggleTagSelection(tag.id)}
                                className={`tag-button ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                            >
                                {tag.title}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </Modal>
    );
};

export default CreateTaskModal;
