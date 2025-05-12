import { Request, Response } from 'express';
import { getTransactionsService, createTransactionService, updateTransactionService } from '../services/transactionService';

export const getTransactionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers['authorization']?.split(' ')[1];

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
    const userId = req.headers['authorization']?.split(' ')[1];

    if (!userId) {
      res.status(400).json({ message: 'Usuário não autenticado' });
      return;
    }

    const { name, type, amount, category, paymentMethod, date } = req.body;

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


export const updateTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { userId, name, type, amount, category, paymentMethod, date } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'Usuário não autenticado' });
      return;
    }

    const updatedTransaction = await updateTransactionService(id, {
      userId,
      name,
      type,
      amount,
      category,
      paymentMethod,
      date,
    });

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ message: 'Erro ao atualizar transação' });
  }
};
