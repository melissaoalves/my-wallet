import prisma from '../config/db';

export const getTransactionsService = async (userId: string) => {
  return await prisma.transaction.findMany({
    where: { userId },
  });
};

export const createTransactionService = async (transactionData: any) => {
  try {
    console.log('Dados para criação de transação no banco de dados:', transactionData);

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


export const updateTransactionService = async (id: string, transactionData: any) => {
  try {
    return await prisma.transaction.update({
      where: { id },
      data: {
        name: transactionData.name,
        type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        category: transactionData.category,
        paymentMethod: transactionData.paymentMethod,
        date: new Date(transactionData.date),
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar transação no banco:', error);
    throw new Error('Erro ao atualizar transação no banco');
  }
};