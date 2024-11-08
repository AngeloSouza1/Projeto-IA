// src/seeds/populateDatabase.js
import sequelize from '../config/database.js';
import Campaign from '../models/Campaign.js';
import Lead from '../models/Lead.js';
import CampaignLead from '../models/CampaignLead.js';

async function populateDatabase() {
  try {
    // Dados realistas para campanhas
    const campaignData = [
      {
        name: 'Incentivo Verão',
        start_date: new Date('2023-01-01'),
        end_date: new Date('2023-03-31'),
        status: 'ativa',
        budget: 15000.00,
      },
      {
        name: 'Promoção de Outono',
        start_date: new Date('2023-04-01'),
        end_date: new Date('2023-06-30'),
        status: 'encerrada',
        budget: 10000.00,
      },
      {
        name: 'Campanha Black Friday',
        start_date: new Date('2023-11-01'),
        end_date: new Date('2023-11-30'),
        status: 'ativa',
        budget: 20000.00,
      }
    ];

    // Cria ou encontra as campanhas no banco de dados
    const campaigns = await Promise.all(
      campaignData.map(async (data) => {
        const [campaign] = await Campaign.findOrCreate({
          where: { name: data.name },
          defaults: data
        });
        return campaign;
      })
    );

    // Dados realistas para leads (total de 30)
    const leadData = Array.from({ length: 3 }, (_, index) => ({
      name: `Lead ${index + 1}`,
      email: `lead${index + 1}@example.com`,
      phone: `(11) 91234-${String(1000 + index).slice(1)}`,
      status: index % 3 === 0 ? 'novo' : (index % 3 === 1 ? 'em contato' : 'convertido'),
      source: index % 2 === 0 ? 'site' : 'rede social',
    }));

    // Gera os leads no banco de dados
    const leads = await Promise.all(
      leadData.map(async (data) => {
        const [lead] = await Lead.findOrCreate({
          where: { email: data.email },
          defaults: data
        });
        return lead;
      })
    );

    // Relaciona cada lead a uma campanha aleatória e preenche todos os campos da CampaignLead
    const campaignLeadData = leads.map((lead) => {
      const selectedCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];

      return {
        campaign_id: selectedCampaign.id,
        lead_id: lead.id,
        created_at: new Date(),         // Data de criação
        updated_at: new Date(),         // Data de atualização
      };
    });

    // Insere os relacionamentos na tabela campaign_leads
    await CampaignLead.bulkCreate(campaignLeadData, { ignoreDuplicates: true });

    console.log('Banco de dados populado com sucesso.');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

populateDatabase();
