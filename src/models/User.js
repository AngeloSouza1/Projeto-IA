import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true, // Validação para garantir que o nome não esteja vazio
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validação para garantir um formato de email válido
    },
  },
  password_digest: {
    type: DataTypes.STRING,
    allowNull: false, // Armazena a senha em formato hash
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'admin',
    validate: {
      isIn: [['admin', 'user', 'tmp']], // Limita os valores de role
    },
  },
}, {
  timestamps: true,
  underscored: true, // Configuração para usar snake_case automaticamente
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default User;
