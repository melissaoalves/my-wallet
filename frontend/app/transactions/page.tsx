"use client";

import { useState, useEffect } from 'react';
import { DataTable } from '../_components/ui/data-table';
import { transactionColumns } from './_columns';
import AddTransactionButton from '../_components/add-transaction-button'; 
import { useAuth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

const TransactionsPage = () => {
  const { userId } = useAuth(); // Recupera o userId do Clerk
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!userId) {
          redirect("/login");
          return;
        }
        const response = await fetch(`http://localhost:3000/api/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
          },
          credentials: 'include',
        });


        if (!response.ok) throw new Error("Erro ao buscar transações");

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
