"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Home = () => {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      redirect("/login");
    }
  }, [userId]);

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
};

export default Home;
