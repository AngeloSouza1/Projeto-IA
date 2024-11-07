import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Campaign from './Campaign.js';

const Metric = sequelize.define('Metric', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  campaign_id: { type: DataTypes.INTEGER, references: { model: Campaign, key: 'id' } },
  leads_generated: { type: DataTypes.INTEGER },
  leads_converted: { type: DataTypes.INTEGER },
  conversion_rate: { type: DataTypes.DECIMAL(5, 2) },
  budget_spent: { type: DataTypes.DECIMAL(10, 2) },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Metric;
