// src/js/dashboard.js
async function testDashboard() {
    try {
      // Verifica os leads
      const leadsResponse = await fetch('/admin/resources/Leads');
      const leadsText = await leadsResponse.text();
      console.log('Leads Response:', leadsText); 
  
      try {
        const totalLeads = JSON.parse(leadsText).length;
        console.log('Total de Leads:', totalLeads);
      } catch (jsonError) {
        console.error('Erro ao fazer parse dos Leads:', jsonError.message);
      }
  
      // Verifica os CampaignLeads
      const campaignLeadsResponse = await fetch('/admin/resources/CampaignLeads');
      const campaignLeadsText = await campaignLeadsResponse.text();
      console.log('CampaignLeads Response:', campaignLeadsText); 
      try {
        const totalInvitedLeads = JSON.parse(campaignLeadsText).length;
        console.log('Total de Leads Convidados:', totalInvitedLeads);
      } catch (jsonError) {
        console.error('Erro ao fazer parse dos CampaignLeads:', jsonError.message);
      }
  
      // Verifica os CampaignLeads com convite aceito
      const acceptedInvitesResponse = await fetch('/admin/resources/CampaignLeads');
      const acceptedInvitesText = await acceptedInvitesResponse.text();
      console.log('Accepted Invites Response:', acceptedInvitesText); 
      try {
        const totalAcceptedInvites = JSON.parse(acceptedInvitesText).filter(lead => lead.accept_invite === true).length;
        console.log('Total de Convites Aceitos:', totalAcceptedInvites);
      } catch (jsonError) {
        console.error('Erro ao fazer parse dos Accepted Invites:', jsonError.message);
      }
  
      return {
        totalLeads,
        totalInvitedLeads,
        totalAcceptedInvites
      };
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }
  
  // Chama a função
  testDashboard();
  