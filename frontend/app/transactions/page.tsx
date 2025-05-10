"use client";
import { useState, useEffect } from 'react';
import { DataTable } from '../_components/ui/data-table';
import { transactionColumns } from './_columns';
import AddTransactionButton from '../_components/add-transaction-button';  // Importe o botão para adicionar transações

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/protected');
        if (!response.ok) throw new Error('Falha ao buscar transações');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchTransactions();
  }, []);

 return (
    <div className="space-y-6 p-6">
      {/* TÍTULO E BOTÃO */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
