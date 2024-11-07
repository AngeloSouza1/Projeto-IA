import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Campaign from './Campaign.js';

const UserCampaign = sequelize.define('UserCampaign', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  campaign_id: { type: DataTypes.INTEGER, references: { model: Campaign, key: 'id' } },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

User.belongsToMany(Campaign, { through: UserCampaign });
Campaign.belongsToMany(User, { through: UserCampaign });

export default UserCampaign;
