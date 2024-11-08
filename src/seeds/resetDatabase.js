import sequelize from '../config/database.js';
import Campaign from '../models/Campaign.js';
import Lead from '../models/Lead.js';
import CampaignLead from '../models/CampaignLead.js';

async function resetDatabase() {
  try {
    // Sincronizar o banco de dados
    await sequelize.sync();

    // Excluir todos os dados das tabelas usando TRUNCATE com CASCADE
    await CampaignLead.sequelize.query('TRUNCATE TABLE "CampaignLeads" CASCADE;');
    await Lead.sequelize.query('TRUNCATE TABLE "Leads" CASCADE;');
    await Campaign.sequelize.query('TRUNCATE TABLE "Campaigns" CASCADE;');

    console.log('Banco de dados resetado com sucesso: Leads, Campaigns e Campaign Leads.');
  } catch (error) {
    console.error('Erro ao resetar o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();
