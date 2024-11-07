import express from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Rota para listar todos os usuários
router.get('/', getUsers);

// Rota para criar um novo usuário
router.post('/', createUser);

// Rota para obter um usuário específico por ID
router.get('/:id', getUserById);

// Rota para atualizar um usuário existente
router.put('/:id', updateUser);

// Rota para deletar um usuário
router.delete('/:id', deleteUser);

export default router;
