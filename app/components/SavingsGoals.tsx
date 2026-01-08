'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, FlagIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, formatDateForInput } from '../utils/helpers';

export default function SavingsGoals() {
    const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, addTransaction } = useFinance();
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');

    // For adding money to goal
    const [addingToGoalId, setAddingToGoalId] = useState<string | null>(null);
    const [addAmount, setAddAmount] = useState('');

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !targetAmount) return;

        addSavingsGoal({
            name,
            targetAmount: parseFloat(targetAmount),
            currentAmount: 0,
            deadline: deadline || undefined,
        });

        setName('');
        setTargetAmount('');
        setDeadline('');
        setIsAdding(false);
    };

    const handleAddMoney = (goalId: string) => {
        if (!addAmount) return;
        const goal = savingsGoals.find(g => g.id === goalId);
        if (goal) {
            const amount = parseFloat(addAmount);

            // Update savings goal
            updateSavingsGoal(goalId, {
                currentAmount: goal.currentAmount + amount
            });

            // Create expense transaction to reduce balance
            addTransaction({
                amount: amount,
                type: 'expense',
                category: 'savings',
                description: `Tabungan: ${goal.name}`,
                date: formatDateForInput(),
            });
        }
        setAddAmount('');
        setAddingToGoalId(null);
    };

    return (
        <div className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                    <FlagIcon className="w-4 h-4 text-purple-500" />
                    <h2 className="text-sm sm:text-base font-bold text-gray-900">
                        Target Tabungan
                    </h2>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                        <PlusIcon className="w-3.5 h-3.5" />
                        Tambah
                    </button>
                )}
            </div>

            {/* Add Goal Form */}
            {isAdding && (
                <form onSubmit={handleAddGoal} className="mb-3 p-3 bg-gray-50 rounded-xl">
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nama target (cth: Beli Laptop)"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                            <input
                                type="number"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                placeholder="Target jumlah"
                                className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Deadline (opsional)"
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                Simpan
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-3 py-2 text-gray-600 text-sm hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* Goals List */}
            <div className="space-y-2">
                {savingsGoals.length === 0 ? (
                    <p className="text-center text-xs text-gray-500 py-4">
                        Belum ada target tabungan. Mulai menabung untuk impianmu!
                    </p>
                ) : (
                    savingsGoals.map(goal => {
                        const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                        const isCompleted = goal.currentAmount >= goal.targetAmount;

                        return (
                            <div
                                key={goal.id}
                                className={`group p-3 rounded-xl transition-colors ${isCompleted
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        {isCompleted ? (
                                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <FlagIcon className="w-5 h-5 text-purple-500" />
                                        )}
                                        <span className={`text-sm font-medium ${isCompleted ? 'text-green-700' : 'text-gray-900'
                                            }`}>
                                            {goal.name}
                                        </span>
                                        {isCompleted && (
                                            <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-medium rounded-full">
                                                Tercapai!
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {!isCompleted && (
                                            <button
                                                onClick={() => setAddingToGoalId(goal.id)}
                                                className="p-1 text-purple-500 hover:bg-purple-100 rounded-lg transition-all"
                                                title="Tambah tabungan"
                                            >
                                                <PlusCircleIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteSavingsGoal(goal.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Add Money Modal */}
                                {addingToGoalId === goal.id && (
                                    <div className="mb-2 flex gap-2">
                                        <div className="relative flex-1">
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">Rp</span>
                                            <input
                                                type="number"
                                                value={addAmount}
                                                onChange={(e) => setAddAmount(e.target.value)}
                                                placeholder="Jumlah"
                                                className="w-full pl-8 pr-2 py-1.5 bg-white border border-purple-300 rounded-lg text-sm text-gray-900 outline-none focus:ring-2 focus:ring-purple-500"
                                                autoFocus
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleAddMoney(goal.id)}
                                            className="px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-lg hover:bg-purple-600"
                                        >
                                            Tambah
                                        </button>
                                        <button
                                            onClick={() => setAddingToGoalId(null)}
                                            className="px-2 py-1.5 text-gray-500 text-xs hover:bg-gray-200 rounded-lg"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}

                                {/* Progress Bar */}
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-purple-500'
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>

                                <div className="flex justify-between text-xs">
                                    <span className={`font-medium ${isCompleted ? 'text-green-600' : 'text-gray-600'
                                        }`}>
                                        {formatCurrency(goal.currentAmount)}
                                    </span>
                                    <span className="text-gray-400">
                                        / {formatCurrency(goal.targetAmount)} ({percentage.toFixed(0)}%)
                                    </span>
                                </div>

                                {goal.deadline && !isCompleted && (
                                    <p className="text-[10px] text-gray-400 mt-1">
                                        Target: {new Date(goal.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
