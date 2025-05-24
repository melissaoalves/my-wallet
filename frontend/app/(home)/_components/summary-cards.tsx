// app/(home)/_components/summary-cards.tsx
import { Card, CardContent, CardHeader } from "../../_components/ui/card";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  summary: {
    balance: number;
    depositsTotal: number;
    investmentsTotal: number;
    expensesTotal: number;
  };
}

const SummaryCards = ({ summary }: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={summary.balance}
        size="large"
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