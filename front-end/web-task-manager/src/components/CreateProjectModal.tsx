import React, { useState } from 'react';
import Modal from 'react-modal';
import {createProject} from "../services/projectService.ts";

Modal.setAppElement('#root');

interface CreateProjectModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onProjectCreated: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onRequestClose, onProjectCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createProject(1, name, description);
        onProjectCreated();
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Criar Projeto"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Criar Projeto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Título</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </Modal>
    );
};

export default CreateProjectModal;
