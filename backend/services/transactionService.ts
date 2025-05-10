import prisma from '../config/db';

export const getTransactionsService = async () => {
  return await prisma.transaction.findMany();
};

export const createTransactionService = async (transactionData: any) => {
  return await prisma.transaction.create({
    data: transactionData
  });
};
