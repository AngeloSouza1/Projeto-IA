// src/controllers/dashboardController.js
import CampaignLead from '../models/CampaignLead.js';
import Lead from '../models/Lead.js';

export const renderDashboard = async (req, res) => {
  try {
    const totalLeads = await Lead.count();
    const totalInvitedLeads = await CampaignLead.count();
    const totalAcceptedInvites = await CampaignLead.count({ where: { accept_invite: true } });

    res.render('dashboard', {
      totalLeads,
      totalInvitedLeads,
      totalAcceptedInvites,
    });
  } catch (error) {
    console.error('Erro ao renderizar o dashboard:', error);
    res.status(500).send('Erro ao renderizar o dashboard');
  }
};
