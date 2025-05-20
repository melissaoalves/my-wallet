"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Navbar from "@app/_components/navbar";

const Home = () => {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      redirect("/login");
    }
  }, [userId]);

  return (
    <>
    <Navbar />
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
    </div>
    </>
  );
};

export default Home;
