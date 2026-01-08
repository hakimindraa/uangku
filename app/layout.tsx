import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FinanceProvider } from "./context/FinanceContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExpenseTracker - Kelola Keuangan Pribadi Anda",
  description: "Aplikasi pencatatan pengeluaran dan pemasukan dengan fitur budget tracking, grafik analitik, dan laporan bulanan.",
  keywords: ["expense tracker", "pengelola keuangan", "budget", "pencatatan pengeluaran", "keuangan pribadi"],
  authors: [{ name: "ExpenseTracker" }],
  openGraph: {
    title: "ExpenseTracker - Kelola Keuangan Pribadi Anda",
    description: "Aplikasi pencatatan pengeluaran dan pemasukan dengan fitur budget tracking dan grafik analitik.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FinanceProvider>
          {children}
        </FinanceProvider>
      </body>
    </html>
  );
}
