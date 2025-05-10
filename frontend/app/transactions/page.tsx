"use client";
import { useState, useEffect } from 'react';
import { DataTable } from '../_components/ui/data-table';
import { transactionColumns } from './_columns';
import { Button } from '@app/_components/ui/button';
import { ArrowDownUpIcon } from 'lucide-react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/transactions');
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
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          Adicionar transação
          <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
