"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const path = usePathname();

  const linkClass = (href: string) =>
    `text-sm font-medium ${
      path === href
        ? "text-[#4CD137]"
        : "text-gray-400 hover:text-gray-200" 
    }`;

  return (
    <nav className="w-full bg-[#0F0F0F] border-b border-[#222222] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">

        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo_individual.svg"
            alt="MyWallet"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-white text-xl font-bold">MyWallet</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className={linkClass("/")}>
            Dashboard
          </Link>
          <Link href="/transactions" className={linkClass("/transactions")}>
            Transações
          </Link>
        </div>
      </div>

      <UserButton showName />
    </nav>
  );
}
