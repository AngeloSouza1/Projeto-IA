import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    activeCampaigns: 0,
    totalLeads: 0,
  });

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const activeCampaigns = await fetch('/admin/resources/Campaigns?filter[status]=ativa')
          .then((res) => res.json())
          .then((data) => data.length); 

        const totalLeads = await fetch('/admin/resources/Leads')
          .then((res) => res.json())
          .then((data) => data.length);

        setMetrics({ activeCampaigns, totalLeads });
      } catch (error) {
        console.error('Erro ao buscar métricas:', error);
      }
    }

    fetchMetrics();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%' }}>
          <h2>Campanhas Ativas</h2>
          <p>Total: <span>{metrics.activeCampaigns}</span></p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '45%' }}>
          <h2>Leads Total</h2>
          <p>Total: <span>{metrics.totalLeads}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
