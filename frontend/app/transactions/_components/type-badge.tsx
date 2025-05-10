import { Badge } from "../../_components/ui/badge";
import { CircleIcon } from "lucide-react";

interface Transaction {
  type: "DEPOSIT" | "EXPENSE" | "INVESTMENT";
}

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === "DEPOSIT") {
    return (
      <Badge className="bg-primary font-bold text-white">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Ganho
      </Badge>
    );
  }
  if (transaction.type === "EXPENSE") {
    return (
      <Badge className="bg-danger font-bold text-white">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Gasto
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-500 font-bold text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
