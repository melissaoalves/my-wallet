// app/(home)/_components/summary-card.tsx
import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../../_components/ui/card";
import AddTransactionButton from "../../_components/add-transaction-button";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  reloadTransactions?: () => void;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  reloadTransactions,
}: SummaryCardProps) => {
  return (
    <Card className="rounded-lg">
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}>
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        {size === "large" && <AddTransactionButton reloadTransactions={reloadTransactions ?? (() => {})} />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
