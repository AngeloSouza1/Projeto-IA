import express from 'express';
import { getCampaigns, createCampaign, getCampaignById, updateCampaign, deleteCampaign } from '../controllers/campaignController.js';

const router = express.Router();

// Rota para listar todas as campanhas
router.get('/', getCampaigns);

// Rota para criar uma nova campanha
router.post('/', createCampaign);

// Rota para obter uma campanha específica por ID
router.get('/:id', getCampaignById);

// Rota para atualizar uma campanha existente
router.put('/:id', updateCampaign);

// Rota para deletar uma campanha
router.delete('/:id', deleteCampaign);

export default router;
