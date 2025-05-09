import type { Metadata } from "next";
import {Mulish} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
})

export const metadata: Metadata = {
  title: "MyWallet",
  description: "PDSI1",
  icons: {
    icon: "/logo_individual.svg",
    shortcut: "/logo_individual.svg",
    apple: "/logo_individual.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.className} dark antialiased`}
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            baseTheme: dark,
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}