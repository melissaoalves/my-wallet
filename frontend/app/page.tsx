"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const fetchUserData = async () => {
  try {
    const response = await fetch("http://localhost:3000/protected", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Usuário não autenticado");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const Home = () => {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      redirect("/login");
    } else {
      fetchUserData();
    }
  }, [userId]);


  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
};

export default Home;
