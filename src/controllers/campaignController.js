import Campaign from '../models/Campaign.js';

// Listar todas as campanhas
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};

// Criar uma nova campanha
export const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: 'Error creating campaign', error });
  }
};

// Obter uma campanha por ID
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (campaign) {
      res.json(campaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error });
  }
};

// Atualizar uma campanha existente
export const updateCampaign = async (req, res) => {
  try {
    const [updated] = await Campaign.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCampaign = await Campaign.findByPk(req.params.id);
      res.json(updatedCampaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating campaign', error });
  }
};

// Deletar uma campanha
export const deleteCampaign = async (req, res) => {
  try {
    const deleted = await Campaign.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Campaign deleted successfully' });
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting campaign', error });
  }
};
