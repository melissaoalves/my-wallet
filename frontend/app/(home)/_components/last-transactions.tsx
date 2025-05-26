"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "../../_components/ui/scroll-area";
import { CardHeader, CardTitle, CardContent } from "../../_components/ui/card";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "../../_constants/transactions";
import Image from "next/image";

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "DEPOSIT" | "EXPENSE" | "INVESTMENT";
  paymentMethod: string;
}

interface LastTransactionsProps {
  userId: string;
  month: string;
  reloadSignal: boolean;
}

const LastTransactions = ({ userId, month, reloadSignal }: LastTransactionsProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchLastTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/last-transactions?userId=${userId}&month=${month}`
        );
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar últimas transações:", error);
      }
    };
    fetchLastTransactions();
  }, [userId, month, reloadSignal]);

  const getAmountColor = (type: string) => {
    if (type === "EXPENSE") return "text-red-500";
    if (type === "DEPOSIT") return "text-green-500";
    return "text-white";
  };

  const getAmountPrefix = (type: string) => {
    return type === "DEPOSIT" ? "+" : "-";
  };

  return (
    <ScrollArea className="rounded-md border mt-6">
      <CardHeader>
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((t) => (
          <div key={t.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[t.paymentMethod]}`}
                  width={20}
                  height={20}
                  alt={t.paymentMethod}
                />
              </div>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(t.date).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <p className={`font-bold text-sm ${getAmountColor(t.type)}`}>
              {getAmountPrefix(t.type)}
              {t.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
