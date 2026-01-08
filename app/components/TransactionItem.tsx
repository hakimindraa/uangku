'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useFinance } from '../context/FinanceContext';
import { getCategoryInfo, formatCurrency, formatDate } from '../utils/helpers';
import { Transaction } from '../types';
import CategoryIcon from './CategoryIcon';

interface TransactionItemProps {
    transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
    const { deleteTransaction } = useFinance();
    const categoryInfo = getCategoryInfo(transaction.category, transaction.type);

    return (
        <div className="group flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
            {/* Category Icon */}
            <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: categoryInfo.color }}
            >
                <CategoryIcon iconName={categoryInfo.iconName} className="w-5 h-5 text-white" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {categoryInfo.name}
                        </h3>
                        {transaction.description && (
                            <p className="text-xs text-gray-500 truncate">
                                {transaction.description}
                            </p>
                        )}
                        <p className="text-[11px] text-gray-400 mt-0.5">
                            {formatDate(transaction.date)}
                        </p>
                    </div>

                    {/* Amount */}
                    <div className="flex-shrink-0 text-right">
                        <p className={`text-sm font-bold whitespace-nowrap ${transaction.type === 'income'
                            ? 'text-emerald-600 '
                            : 'text-red-500 '
                            }`}>
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Delete Button - Hidden on mobile, visible on hover for desktop */}
            <button
                onClick={() => deleteTransaction(transaction.id)}
                className="flex-shrink-0 opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                aria-label="Hapus transaksi"
            >
                <TrashIcon className="w-4 h-4" />
            </button>
        </div>
    );
}
