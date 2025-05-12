import prisma from '../config/db';

export const getTransactionsService = async (userId: string) => {
  return await prisma.transaction.findMany({
    where: { userId },
  });
};

export const createTransactionService = async (transactionData: any) => {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId: transactionData.userId,
        name: transactionData.name,
        type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        category: transactionData.category,
        paymentMethod: transactionData.paymentMethod,
        date: new Date(transactionData.date),
      },
    });

    return transaction;
  } catch (error) {
    console.error('Erro ao criar transação no banco:', error);
    throw new Error('Erro ao criar transação no banco');
  }
};
