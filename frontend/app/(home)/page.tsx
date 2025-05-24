"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Navbar from "@app/_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";

const Home = () => {
  const { userId } = useAuth();
  const [month, setMonth] = useState("01");

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
      </div>
    </>
  );
};

export default Home;
