'use client';

import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, WalletIcon } from '@heroicons/react/24/solid';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, calculateBalance, calculateTotalIncome, calculateTotalExpense, getCurrentMonthTransactions } from '../utils/helpers';

export default function BalanceCard() {
    const { transactions } = useFinance();

    const currentMonthTransactions = getCurrentMonthTransactions(transactions);
    const balance = calculateBalance(transactions);
    const monthlyIncome = calculateTotalIncome(currentMonthTransactions);
    const monthlyExpense = calculateTotalExpense(currentMonthTransactions);

    return (
        <div className="relative overflow-hidden">
            {/* Main Balance Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-emerald-500/25">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <WalletIcon className="w-5 h-5 text-emerald-200" />
                        <span className="text-emerald-100 text-sm font-medium">Total Saldo</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                        {formatCurrency(balance)}
                    </h2>

                    {/* Monthly Summary */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Income */}
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                            <div className="flex items-center gap-1.5 mb-1">
                                <div className="p-1 bg-green-400/30 rounded-md">
                                    <ArrowTrendingUpIcon className="w-3 h-3 text-green-200" />
                                </div>
                                <span className="text-[10px] text-emerald-100">Pemasukan</span>
                            </div>
                            <p className="text-base font-bold tabular-nums">
                                {formatCurrency(monthlyIncome)}
                            </p>
                            <p className="text-[10px] text-emerald-200 mt-0.5">Bulan ini</p>
                        </div>

                        {/* Expense */}
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                            <div className="flex items-center gap-1.5 mb-1">
                                <div className="p-1 bg-red-400/30 rounded-md">
                                    <ArrowTrendingDownIcon className="w-3 h-3 text-red-200" />
                                </div>
                                <span className="text-[10px] text-emerald-100">Pengeluaran</span>
                            </div>
                            <p className="text-base font-bold tabular-nums">
                                {formatCurrency(monthlyExpense)}
                            </p>
                            <p className="text-[10px] text-emerald-200 mt-0.5">Bulan ini</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
