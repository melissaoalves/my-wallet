"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { redirect } from "next/navigation";
import Navbar from "@app/_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import LastTransactions from "./_components/last-transactions";

const Home = () => {
  const { userId } = useAuth();
  const [month, setMonth] = useState(() => {
    const currentMonth = new Date().getMonth() + 1;
    return String(currentMonth).padStart(2, "0");
  });
  const [reloadSignal, setReloadSignal] = useState(false);

  const triggerReload = useCallback(() => {
    setReloadSignal((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!userId) redirect("/login");
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect setMonth={setMonth} />
        </div>
        {userId && (
          <>
            <SummaryCards month={month} userId={userId} reloadTransactions={triggerReload} />
            <LastTransactions userId={userId} month={month} reloadSignal={reloadSignal} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
