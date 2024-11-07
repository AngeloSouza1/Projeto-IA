// src/models/User.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_digest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'admin',
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true, // Adiciona automaticamente snake_case
  timestamps: true, // Usa as colunas de timestamp
});

export default User;
