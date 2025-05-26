"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "../../_components/ui/scroll-area";
import { CardHeader, CardTitle, CardContent } from "../../_components/ui/card";

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "DEPOSIT" | "EXPENSE" | "INVESTMENT";
}

interface LastTransactionsProps {
  userId: string;
  month: string;
}

const LastTransactions = ({ userId, month }: LastTransactionsProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchLastTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/last-transactions?userId=${userId}&month=${month}`);
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar últimas transações:", error);
      }
    };
    fetchLastTransactions();
  }, [userId, month]);

  return (
    <ScrollArea className="rounded-md border mt-6">
      <CardHeader>
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((t) => (
          <div key={t.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(t.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <p className={`font-bold ${t.type === "EXPENSE" ? "text-red-500" : t.type === "DEPOSIT" ? "text-green-500" : "text-white"}`}>
              {(t.type === "DEPOSIT" ? "+" : "-") + t.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
