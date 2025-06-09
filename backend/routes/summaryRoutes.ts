import { Router } from 'express';
import { getSummaryController, getLastTransactionsController, getCategorySummaryController} from '../controllers/summaryController';

const router = Router();

router.get('/summary', getSummaryController);
router.get('/last-transactions', getLastTransactionsController);
router.get('/category-summary', getCategorySummaryController);


export default router;
