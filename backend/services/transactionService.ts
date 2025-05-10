import prisma from '../config/db';

export const getTransactionsService = async () => {
  return await prisma.transaction.findMany();
};

export const createTransactionService = async (transactionData: any) => {
  console.log('Received transaction data:', transactionData);

  if (!transactionData.userId) {
    throw new Error("userId is required");
  }

  const amount = parseFloat(transactionData.amount.replace('R$', '').replace(/\./g, '').replace(',', '.'));

  if (isNaN(amount)) {
    throw new Error("Invalid amount format");
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        name: transactionData.name,
        amount: amount,
        type: transactionData.type,
        category: transactionData.category,
        paymentMethod: transactionData.paymentMethod,
        date: new Date(transactionData.date),
        userId: transactionData.userId,
      },
    });

    console.log('Transaction successfully created:', transaction);
    return transaction;
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    throw new Error('Erro ao criar transação no banco');
  }
};
