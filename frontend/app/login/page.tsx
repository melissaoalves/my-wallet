import Image from "next/image";
import { Button } from "@app/_components/ui/button";
import { LogInIcon } from "lucide-react";
import Carousel from "./carousel";

const LoginPage = async () => {
  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="My Wallet"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          A MyWallet é uma plataforma de gestão financeira para monitorar suas
          movimentações, e oferecer dicas personalizadas, facilitando o controle
          do seu orçamento.
        </p>
        <Button variant="outline">
          <LogInIcon className="mr-2" />
          Fazer login ou criar conta
        </Button>
      </div>

      {/* DIREITA */}
      <div className="relative h-full w-full bg-[#41D40E] bg-no-repeat bg-center bg-cover">
        <Image
          src="/fundoverde.svg"
          alt="Faça login"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
