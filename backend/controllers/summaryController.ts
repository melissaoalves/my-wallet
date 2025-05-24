import { Request, Response } from 'express';
import prisma from '../config/db';

export const getSummaryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { month, userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      res.status(400).json({ message: 'Usuário não autenticado' });
      return;
    }

    const startDate = new Date(`2025-${month}-01`);
    const endDate = new Date(`2025-${month}-31`);

    const depositsTotal = await prisma.transaction.aggregate({
      where: { userId, type: "DEPOSIT", date: { gte: startDate, lte: endDate } },
      _sum: { amount: true },
    });

    const investmentsTotal = await prisma.transaction.aggregate({
      where: { userId, type: "INVESTMENT", date: { gte: startDate, lte: endDate } },
      _sum: { amount: true },
    });

    const expensesTotal = await prisma.transaction.aggregate({
      where: { userId, type: "EXPENSE", date: { gte: startDate, lte: endDate } },
      _sum: { amount: true },
    });

    const depositsAmount = depositsTotal._sum.amount ?? 0;
    const investmentsAmount = investmentsTotal._sum.amount ?? 0;
    const expensesAmount = expensesTotal._sum.amount ?? 0;

    const balance = Number(depositsAmount) - Number(investmentsAmount) - Number(expensesAmount);

    res.json({
      depositsTotal: depositsAmount,
      investmentsTotal: investmentsAmount,
      expensesTotal: expensesAmount,
      balance,
    });
  } catch (error) {
    console.error("Erro ao calcular resumos:", error);
    res.status(500).json({ message: "Erro ao calcular resumos" });
  }
};
