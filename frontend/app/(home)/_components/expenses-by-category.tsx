"use client";

interface ExpenseCategory {
  category: string;
  totalAmount: number;
  percentageOfTotal: number;
}

interface ExpensesByCategoryProps {
  data: ExpenseCategory[] | undefined;
}

const CATEGORY_LABELS: Record<string, string> = {
  HOUSING: "Moradia",
  TRANSPORTATION: "Transporte",
  FOOD: "Alimentação",
  ENTERTAINMENT: "Entretenimento",
  HEALTH: "Saúde",
  UTILITY: "Utilidades",
  SALARY: "Salário",
  EDUCATION: "Educação",
  OTHER: "Outros",
};

const ExpensesByCategory = ({ data }: ExpensesByCategoryProps) => {
  return (
    <div className="rounded-md border p-4 w-full h-full">
      <h2 className="text-lg font-bold mb-4">Gastos por categoria</h2>
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((cat) => {
            const label = CATEGORY_LABELS[cat.category] ?? cat.category;
            return (
              <div key={cat.category}>
                <div className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span>{cat.percentageOfTotal}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div
                    className="h-full bg-gray-400 rounded-full"
                    style={{ width: `${cat.percentageOfTotal}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ {cat.totalAmount.toLocaleString("pt-BR")}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ExpensesByCategory;
