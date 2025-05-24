import { useEffect, useState } from "react";
import SummaryCard from "./summary-card";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";

interface SummaryCardsProps {
  month: string;
  userId: string;
  reloadTransactions?: () => void;
}

const SummaryCards = ({ month, userId, reloadTransactions }: SummaryCardsProps) => {
  const [summary, setSummary] = useState({
    balance: 0,
    depositsTotal: 0,
    investmentsTotal: 0,
    expensesTotal: 0,
  });

  const fetchSummary = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/summary?month=${month}&userId=${userId}`);
      if (!response.ok) throw new Error("Erro ao buscar resumo");
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [month, userId]);

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={summary.balance}
        size="large"
        reloadTransactions={reloadTransactions}
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={summary.investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={summary.depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={summary.expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
