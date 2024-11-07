import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Listar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Criar um novo usuário
export const createUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const passwordDigest = await bcrypt.hash(password, 10);
    const user = await User.create({ ...userData, passwordDigest });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Obter um usuário por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Atualizar um usuário existente
export const updateUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    if (password) {
      userData.passwordDigest = await bcrypt.hash(password, 10);
    }
    const [updated] = await User.update(userData, { where: { id: req.params.id } });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

// Deletar um usuário
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
