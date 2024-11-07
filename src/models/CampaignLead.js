import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Campaign from './Campaign.js';
import Lead from './Lead.js';

const CampaignLead = sequelize.define('CampaignLead', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  campaign_id: { type: DataTypes.INTEGER, references: { model: Campaign, key: 'id' } },
  lead_id: { type: DataTypes.INTEGER, references: { model: Lead, key: 'id' } },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Campaign.belongsToMany(Lead, { through: CampaignLead });
Lead.belongsToMany(Campaign, { through: CampaignLead });

export default CampaignLead;
