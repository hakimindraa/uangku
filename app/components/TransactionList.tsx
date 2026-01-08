'use client';

import { useState } from 'react';
import { FunnelIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useFinance } from '../context/FinanceContext';
import TransactionItem from './TransactionItem';
import { TransactionType } from '../types';

export default function TransactionList() {
    const { transactions } = useFinance();
    const [filter, setFilter] = useState<'all' | TransactionType>('all');

    const filteredTransactions = filter === 'all'
        ? transactions
        : transactions.filter(t => t.type === filter);

    // Sort by date (newest first)
    const sortedTransactions = [...filteredTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900 ">
                        Riwayat Transaksi
                    </h2>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-0.5 p-0.5 bg-gray-100 rounded-lg w-full sm:w-auto">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 text-xs font-medium rounded-md transition-all ${filter === 'all'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 '
                            }`}
                    >
                        Semua
                    </button>
                    <button
                        onClick={() => setFilter('income')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 text-xs font-medium rounded-md transition-all ${filter === 'income'
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'text-gray-600 '
                            }`}
                    >
                        Masuk
                    </button>
                    <button
                        onClick={() => setFilter('expense')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 text-xs font-medium rounded-md transition-all ${filter === 'expense'
                            ? 'bg-red-500 text-white shadow-sm'
                            : 'text-gray-600 '
                            }`}
                    >
                        Keluar
                    </button>
                </div>
            </div>

            {/* Transaction List */}
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                {sortedTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500 ">
                        <FunnelIcon className="w-12 h-12 mb-3 opacity-50" />
                        <p className="text-center">
                            {filter === 'all'
                                ? 'Belum ada transaksi. Mulai catat keuanganmu!'
                                : `Tidak ada transaksi ${filter === 'income' ? 'pemasukan' : 'pengeluaran'}`
                            }
                        </p>
                    </div>
                ) : (
                    sortedTransactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))
                )}
            </div>

            {/* Summary */}
            {sortedTransactions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 ">
                    <p className="text-xs text-gray-500 text-center">
                        Menampilkan {sortedTransactions.length} transaksi
                    </p>
                </div>
            )}
        </div>
    );
}
