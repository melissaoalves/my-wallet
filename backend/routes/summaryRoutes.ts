// routes/summaryRoutes.ts
import { Router } from 'express';
import { getSummaryController } from '../controllers/summaryController';

const router = Router();

// Rota para pegar o resumo por mês
router.get('/summary', getSummaryController);

export default router;
