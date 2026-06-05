import { Router } from 'express';
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  getLeadById,
} from '../controllers/leadController';

const router = Router();

router.get('/', getLeads);
router.post('/', createLead);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
