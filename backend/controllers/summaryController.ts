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
    const endDate   = new Date(`2025-${month}-31`);

    const priorDeposits = await prisma.transaction.aggregate({
      where: { userId, type: "DEPOSIT",    date: { lt: startDate } },
      _sum:  { amount: true },
    });
    const priorInvests  = await prisma.transaction.aggregate({
      where: { userId, type: "INVESTMENT", date: { lt: startDate } },
      _sum:  { amount: true },
    });
    const priorExpenses = await prisma.transaction.aggregate({
      where: { userId, type: "EXPENSE",    date: { lt: startDate } },
      _sum:  { amount: true },
    });

    const openingDeposits    = Number(priorDeposits._sum.amount ?? 0);
    const openingInvestments = Number(priorInvests._sum.amount ?? 0);
    const openingExpenses    = Number(priorExpenses._sum.amount ?? 0);
    const openingBalance     = openingDeposits - openingInvestments - openingExpenses;

    const depositsTotal = await prisma.transaction.aggregate({
      where: { userId, type: "DEPOSIT",    date: { gte: startDate, lte: endDate } },
      _sum:  { amount: true },
    });
    const investmentsTotal = await prisma.transaction.aggregate({
      where: { userId, type: "INVESTMENT", date: { gte: startDate, lte: endDate } },
      _sum:  { amount: true },
    });
    const expensesTotal = await prisma.transaction.aggregate({
      where: { userId, type: "EXPENSE",    date: { gte: startDate, lte: endDate } },
      _sum:  { amount: true },
    });

    const depositsAmount     = Number(depositsTotal._sum.amount ?? 0);
    const investmentsAmount  = Number(investmentsTotal._sum.amount ?? 0);
    const expensesAmount     = Number(expensesTotal._sum.amount ?? 0);

    const monthNet = depositsAmount - investmentsAmount - expensesAmount;

    const balance = openingBalance + monthNet;

    res.json({
      depositsTotal: depositsAmount,
      investmentsTotal: investmentsAmount,
      expensesTotal: expensesAmount,
      openingBalance,
      balance,
    });
  } catch (error) {
    console.error("Erro ao calcular resumos:", error);
    res.status(500).json({ message: "Erro ao calcular resumos" });
  }
};

export const getLastTransactionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, month } = req.query;
    const startDate = new Date(`2025-${month}-01`);
    const endDate   = new Date(`2025-${month}-31`);

    const lastTransactions = await prisma.transaction.findMany({
      where: {
        userId: String(userId),
        date:   { gte: startDate, lte: endDate },
      },
      orderBy: { date: 'desc' },
      take: 10,
    });

    res.json(lastTransactions);
  } catch (error) {
    console.error("Erro ao buscar últimas transações:", error);
    res.status(500).json({ message: "Erro ao buscar últimas transações" });
  }
};

export const getCategorySummaryController = async (req: Request, res: Response) => {
  try {
    const { userId, month } = req.query;
    const startDate = new Date(`2025-${month}-01`);
    const endDate   = new Date(`2025-${month}-31`);

    const totalExpense = await prisma.transaction.aggregate({
      where: {
        userId: String(userId),
        type:   'EXPENSE',
        date:   { gte: startDate, lte: endDate },
      },
      _sum: { amount: true },
    });

    const rawSummary = await prisma.transaction.groupBy({
      by: ['category'],
      where: {
        userId: String(userId),
        type:   'EXPENSE',
        date:   { gte: startDate, lte: endDate },
      },
      _sum: { amount: true },
    });

    const total = totalExpense._sum.amount ?? 0;

    const formatted = rawSummary.map((item) => ({
      category: item.category,
      totalAmount: item._sum.amount ?? 0,
      percentageOfTotal:
        Number(total) > 0
          ? Math.round((Number(item._sum.amount ?? 0) / Number(total)) * 100)
          : 0,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Erro ao buscar gastos por categoria:", error);
    res.status(500).json({ message: 'Erro ao buscar gastos por categoria' });
  }
};
