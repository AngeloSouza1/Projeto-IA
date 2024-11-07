import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Lead from './Lead.js';

const Referral = sequelize.define('Referral', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  lead_id: { type: DataTypes.INTEGER, references: { model: Lead, key: 'id' } },
  referral_code: { type: DataTypes.STRING(50), unique: true },
  status: { type: DataTypes.STRING(50) },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Referral;
