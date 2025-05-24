import { Router } from 'express';
import { getSummaryController } from '../controllers/summaryController';

const router = Router();

router.get('/summary', getSummaryController);

export default router;
