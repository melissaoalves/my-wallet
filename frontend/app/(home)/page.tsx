"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Navbar from "@app/_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import LastTransactions from "./_components/last-transactions";

const Home = () => {
  const { userId } = useAuth();
  
  const getCurrentMonth = () => {
    const now = new Date();
    return (now.getMonth() + 1).toString().padStart(2, '0');
  };

  const [month, setMonth] = useState(getCurrentMonth());

  useEffect(() => {
    if (!userId) {
      redirect("/login");
    }
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect setMonth={setMonth} />
        </div>
        {userId && <SummaryCards month={month} userId={userId} />}
        <LastTransactions userId={userId!} month={month} />

      </div>
    </>
  );
};

export default Home;
