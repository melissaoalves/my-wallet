import { Router } from 'express';
import { getSummaryController, getLastTransactionsController } from '../controllers/summaryController';

const router = Router();

router.get('/summary', getSummaryController);
router.get('/last-transactions', getLastTransactionsController);

export default router;
