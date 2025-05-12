import { Router } from 'express';
import { 
  getTransactionsController, 
  createTransactionController, 
  updateTransactionController, 
  deleteTransactionController
} from '../controllers/transactionController';

const router = Router();

router.get('/transactions', getTransactionsController);
router.post('/transactions', createTransactionController);
router.put('/transactions/:id', updateTransactionController);
router.delete('/transactions/:id', deleteTransactionController);

export default router;
