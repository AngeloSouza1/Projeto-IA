// src/controllers/dashboardController.js
import CampaignLead from '../models/CampaignLead.js'; // Importar o modelo de CampaignLead
import Lead from '../models/Lead.js'; // Importar o modelo de Lead

export const renderDashboard = async (req, res) => {
  try {
    // Contagem de leads gerados
    const totalLeads = await Lead.count();

    // Contagem de leads que foram convidados
    const totalInvitedLeads = await CampaignLead.count();

    // Contagem de leads que aceitaram o convite
    const totalAcceptedInvites = await CampaignLead.count({ where: { accept_invite: true } });

    // Renderize a view do dashboard com os dados
    res.render('dashboard', {
      totalLeads,
      totalInvitedLeads,
      totalAcceptedInvites
    });
  } catch (error) {
    console.error('Erro ao renderizar o dashboard:', error);
    res.status(500).send('Erro ao renderizar o dashboard');
  }
};
