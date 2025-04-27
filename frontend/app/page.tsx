import { Button } from "./_components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const fetchUserData = async () => {
  try {
    const response = await fetch("http://localhost:3000/protected", {
      method: "GET",
      credentials: "include", // Inclui cookies para sessão
    });

    if (!response.ok) {
      throw new Error("Usuário não autenticado");
    }

    const data = await response.json();
    console.log(data); // Exibe os dados do usuário autenticado
  } catch (error) {
    console.error(error);
  }
};

// Componente Home
const Home = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
};

export default Home;