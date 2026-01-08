'use client';

import { useState } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import Charts from './components/Charts';
import TransactionList from './components/TransactionList';
import BudgetSection from './components/BudgetSection';
import SavingsGoals from './components/SavingsGoals';
import TransactionForm from './components/TransactionForm';
import FloatingButton from './components/FloatingButton';
import ExportButton from './components/ExportButton';
import { useFinance } from './context/FinanceContext';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isLoading } = useFinance();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 overflow-x-hidden">
        {/* Top Actions */}
        <div className="flex justify-end mb-4">
          <ExportButton />
        </div>

        {/* Balance Card */}
        <section className="mb-6">
          <BalanceCard />
        </section>

        {/* Savings Goals */}
        <section className="mb-6">
          <SavingsGoals />
        </section>

        {/* Charts */}
        <section className="mb-6">
          <Charts />
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Transaction List */}
          <section>
            <TransactionList />
          </section>

          {/* Budget Section */}
          <section>
            <BudgetSection />
          </section>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingButton onClick={() => setIsFormOpen(true)} />

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}
