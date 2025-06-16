"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  type TooltipItem,
} from "chart.js";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  RepeatIcon,
} from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardPieChartProps {
  data: {
    depositsTotal: number | string;
    expensesTotal: number | string;
    investmentsTotal: number | string;
  };
}

const DashboardPieChart = ({ data }: DashboardPieChartProps) => {
  // 1) Converte tudo para número
  const deposits = Number(data.depositsTotal) || 0;
  const expenses = Number(data.expensesTotal) || 0;
  const investments = Number(data.investmentsTotal) || 0;

  // 2) Calcula total real
  const total = deposits + expenses + investments;

  // 3) Função de porcentagem
  const getPercentage = (value: number) =>
    total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";

  // 4) Dados para o gráfico
  const chartData = {
    labels: ["Ganhos", "Gastos", "Investimentos"],
    datasets: [
      {
        data: [deposits, expenses, investments],
        backgroundColor: ["#22c55e", "#ef4444", "#ffffff"],
        borderWidth: 8,
        borderColor: "#0c0c0c",
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"pie">) {
            const idx = tooltipItem.dataIndex;
            const label = chartData.labels[idx];
            const value = chartData.datasets[0].data[idx] as number;
            return `${label}: R$ ${value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-md border p-4 flex flex-col items-center gap-6 h-full">
      <div className="w-40 h-40">
        <Pie data={chartData} options={chartOptions} />
      </div>

      <div className="space-y-4 w-full text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-green-600 p-1 rounded">
              <TrendingUpIcon size={14} className="text-white" />
            </span>
            Ganhos
          </div>
          <span className="font-bold text-white">
            {getPercentage(deposits)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 p-1 rounded">
              <TrendingDownIcon size={14} className="text-white" />
            </span>
            Gastos
          </div>
          <span className="font-bold text-white">
            {getPercentage(expenses)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white p-1 rounded">
              <RepeatIcon size={14} className="text-black" />
            </span>
            Investimentos
          </div>
          <span className="font-bold text-white">
            {getPercentage(investments)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPieChart;
