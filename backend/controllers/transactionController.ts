import { Request, Response } from 'express';
import { getTransactionsService, createTransactionService } from '../services/transactionService';

export const getTransactionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'Usuário não autenticado' });
      return;
    }

    const transactions = await getTransactionsService(userId);
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
};

export const createTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, name, type, amount, category, paymentMethod, date } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'Usuário não autenticado' });
      return;
    }

    const transaction = await createTransactionService({
      userId,
      name,
      type,
      amount,
      category,
      paymentMethod,
      date
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ message: 'Erro ao criar transação' });
  }
};
