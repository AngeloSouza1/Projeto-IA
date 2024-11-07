import Lead from '../models/Lead.js';

export const getLeads = async (req, res) => {
  const leads = await Lead.findAll();
  res.json(leads);
};

export const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
};

export const getLeadById = async (req, res) => {
  const lead = await Lead.findByPk(req.params.id);
  res.json(lead);
};

export const updateLead = async (req, res) => {
  const lead = await Lead.update(req.body, { where: { id: req.params.id } });
  res.json(lead);
};

export const deleteLead = async (req, res) => {
  await Lead.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Lead deleted' });
};
