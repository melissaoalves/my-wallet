import { Router } from 'express';
import { 
  getTransactionsController, 
  createTransactionController, 
  updateTransactionController 
} from '../controllers/transactionController';

const router = Router();

router.get('/transactions', getTransactionsController);
router.post('/transactions', createTransactionController);
router.put('/transactions/:id', updateTransactionController);

export default router;
