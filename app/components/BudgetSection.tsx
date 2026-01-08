'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useFinance } from '../context/FinanceContext';
import { EXPENSE_CATEGORIES } from '../types';
import { formatCurrency, getMonthlySpendingByCategory } from '../utils/helpers';
import CategoryIcon from './CategoryIcon';

export default function BudgetSection() {
    const { transactions, budgets, addBudget, deleteBudget } = useFinance();
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [limitAmount, setLimitAmount] = useState('');

    const monthlySpending = getMonthlySpendingByCategory(transactions);

    const handleAddBudget = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory || !limitAmount) return;

        addBudget({
            category: selectedCategory,
            limit: parseFloat(limitAmount),
            period: 'monthly',
        });

        setSelectedCategory('');
        setLimitAmount('');
        setIsAdding(false);
    };

    const getCategoryInfo = (categoryId: string) => {
        return EXPENSE_CATEGORIES.find(c => c.id === categoryId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
    };

    const availableCategories = EXPENSE_CATEGORIES.filter(
        cat => !budgets.some(b => b.category === cat.id)
    );

    return (
        <div className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm sm:text-base font-bold text-gray-900 ">
                    💰 Budget Bulanan
                </h2>
                {!isAdding && availableCategories.length > 0 && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                        <PlusIcon className="w-3.5 h-3.5" />
                        Tambah
                    </button>
                )}
            </div>

            {/* Add Budget Form */}
            {isAdding && (
                <form onSubmit={handleAddBudget} className="mb-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="space-y-3">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            {availableCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                            <input
                                type="number"
                                value={limitAmount}
                                onChange={(e) => setLimitAmount(e.target.value)}
                                placeholder="Limit budget"
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                            >
                                Simpan
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2.5 text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* Budget List */}
            <div className="space-y-2">
                {budgets.length === 0 ? (
                    <p className="text-center text-xs text-gray-500 py-4">
                        Belum ada budget. Tambahkan untuk tracking pengeluaran!
                    </p>
                ) : (
                    budgets.map(budget => {
                        const categoryInfo = getCategoryInfo(budget.category);
                        const spent = monthlySpending[budget.category] || 0;
                        const percentage = Math.min((spent / budget.limit) * 100, 100);
                        const isOverBudget = spent > budget.limit;
                        const isNearLimit = percentage >= 80 && !isOverBudget;

                        return (
                            <div
                                key={budget.id}
                                className="group p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-7 h-7 flex items-center justify-center rounded-lg"
                                            style={{ backgroundColor: categoryInfo.color }}
                                        >
                                            <CategoryIcon iconName={categoryInfo.iconName} className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 ">
                                            {categoryInfo.name}
                                        </span>
                                        {isOverBudget && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                                                <ExclamationTriangleIcon className="w-3 h-3" />
                                                Over!
                                            </span>
                                        )}
                                        {isNearLimit && (
                                            <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
                                                Hampir limit
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => deleteBudget(budget.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${isOverBudget
                                            ? 'bg-red-500'
                                            : isNearLimit
                                                ? 'bg-amber-500'
                                                : 'bg-emerald-500'
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className={`font-medium ${isOverBudget ? 'text-red-500' : 'text-gray-600 '
                                        }`}>
                                        {formatCurrency(spent)}
                                    </span>
                                    <span className="text-gray-400 ">
                                        / {formatCurrency(budget.limit)}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
