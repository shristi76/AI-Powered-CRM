import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GrowEasy",
  description: "AI-powered CRM CSV Import Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          min-h-screen
          bg-slate-50
          font-sans
          text-slate-900
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}