import { Router } from 'express';
import { getTransactionsController, createTransactionController } from '../controllers/transactionController';

const router = Router();

router.get('/transactions', getTransactionsController);
router.post('/transactions', createTransactionController);

export default router;
