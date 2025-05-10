import prisma from '../config/db';

export const getTransactionsService = async () => {
  return await prisma.transaction.findMany();
};

export const createTransactionService = async (transactionData: any) => {
  console.log('Received transaction data:', transactionData); // Log para verificar os dados recebidos

  // Verificar se o userId está presente
  if (!transactionData.userId) {
    throw new Error("userId is required");
  }

  // Formatar o valor de 'amount' removendo 'R$' e convertendo para número
  const amount = parseFloat(transactionData.amount.replace('R$', '').replace(/\./g, '').replace(',', '.'));

  if (isNaN(amount)) {
    throw new Error("Invalid amount format");
  }

  try {
    // Criando a transação no banco
    const transaction = await prisma.transaction.create({
      data: {
        name: transactionData.name,
        amount: amount, // Use o valor formatado
        type: transactionData.type,
        category: transactionData.category,
        paymentMethod: transactionData.paymentMethod,
        date: new Date(transactionData.date), // Certifique-se de que a data está no formato correto
        userId: transactionData.userId, // Inclua o userId aqui
      },
    });

    console.log('Transaction successfully created:', transaction);
    return transaction;
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    throw new Error('Erro ao criar transação no banco');
  }
};
