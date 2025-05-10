import { Request, Response } from 'express';
import { getTransactionsService, createTransactionService } from '../services/transactionService';

export const getTransactionsController = async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactionsService();
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
};

export const createTransactionController = async (req: Request, res: Response) => {
  try {
    const transaction = await createTransactionService(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ message: 'Erro ao criar transação' });
  }
};
