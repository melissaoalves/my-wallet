// controllers/summaryController.ts
import { Request, Response } from 'express';
import prisma from '../config/db';

// Função para calcular os resumos mensais
export const getSummaryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(`2024-${month}-31`);

    const depositsTotal = await prisma.transaction.aggregate({
      where: { type: "DEPOSIT", date: { gte: startDate, lte: endDate } },
      _sum: { amount: true },
    });

    const investmentsTotal = await prisma.transaction.aggregate({
      where: { type: "INVESTMENT", date: { gte: startDate, lte: endDate } },
      _sum: { amount: true },
    });

    const expensesTotal = await prisma.transaction.aggregate({
      where: { type: "EXPENSE", date: { gte: startDate, lte: endDate } },
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
