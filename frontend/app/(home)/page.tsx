"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { redirect } from "next/navigation";
import Navbar from "@app/_components/navbar";
import TimeSelect from "./_components/time-select";
import SummaryCards from "./_components/summary-cards";
import LastTransactions from "./_components/last-transactions";
import DashboardPieChart from "./_components/dashboard-pie-chart";
import ExpensesByCategory from "./_components/expenses-by-category";

interface ExpenseCategory {
  category: string;
  totalAmount: number;
  percentageOfTotal: number;
}

interface SummaryData {
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const Home = () => {
  const { userId } = useAuth();

  const [month, setMonth] = useState(() => {
    const currentMonth = new Date().getMonth() + 1;
    return String(currentMonth).padStart(2, "0");
  });

  const [reloadSignal, setReloadSignal] = useState(false);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [expensesByCategory, setExpensesByCategory] = useState<ExpenseCategory[]>([]);

  const triggerReload = useCallback(() => {
    setReloadSignal(prev => !prev);
  }, []);

  useEffect(() => {
    if (!userId) redirect("/login");
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, categoryRes] = await Promise.all([
          fetch(`http://localhost:3000/api/summary?userId=${userId}&month=${month}`),
          fetch(`http://localhost:3000/api/category-summary?userId=${userId}&month=${month}`),
        ]);

        const summaryData = await summaryRes.json();
        const categoryData = await categoryRes.json();

        setSummary(summaryData);
        setExpensesByCategory(categoryData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (userId) fetchData();
  }, [userId, month, reloadSignal]);

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect setMonth={setMonth} />
        </div>

        {userId && summary && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-6">
              <SummaryCards
                month={month}
                userId={userId}
                reloadSignal={reloadSignal}
                reloadTransactions={triggerReload}
              />

              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex-1 min-w-[300px]">
                  <DashboardPieChart
                    data={{
                      depositsTotal: summary.depositsTotal,
                      expensesTotal: summary.expensesTotal,
                      investmentsTotal: summary.investmentsTotal,
                    }}
                  />
                </div>
                <div className="flex-1 min-w-[300px]">
                  <ExpensesByCategory data={expensesByCategory} />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[450px] h-full">
              <LastTransactions
                userId={userId}
                month={month}
                reloadSignal={reloadSignal}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
