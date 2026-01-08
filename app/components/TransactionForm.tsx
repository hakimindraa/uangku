'use client';

import { useState } from 'react';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useFinance } from '../context/FinanceContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TransactionType } from '../types';
import { formatDateForInput } from '../utils/helpers';
import CategoryIcon from './CategoryIcon';

interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TransactionForm({ isOpen, onClose }: TransactionFormProps) {
    const { addTransaction } = useFinance();
    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(formatDateForInput());

    const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || !category) return;

        addTransaction({
            amount: parseFloat(amount),
            type,
            category,
            description,
            date,
        });

        // Reset form
        setAmount('');
        setCategory('');
        setDescription('');
        setDate(formatDateForInput());
        onClose();
    };

    const handleTypeChange = (newType: TransactionType) => {
        setType(newType);
        setCategory('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full sm:max-w-md max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl transform transition-all animate-slide-up overflow-hidden flex flex-col">
                {/* Header - Fixed */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 ">
                    <h2 className="text-xl font-bold text-gray-900 ">
                        Tambah Transaksi
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 pt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Type Toggle */}
                        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
                            <button
                                type="button"
                                onClick={() => handleTypeChange('expense')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all text-sm ${type === 'expense'
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                    : 'text-gray-600 hover:bg-gray-200 '
                                    }`}
                            >
                                <MinusIcon className="w-4 h-4" />
                                Pengeluaran
                            </button>
                            <button
                                type="button"
                                onClick={() => handleTypeChange('income')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-all text-sm ${type === 'income'
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                    : 'text-gray-600 hover:bg-gray-200 '
                                    }`}
                            >
                                <PlusIcon className="w-4 h-4" />
                                Pemasukan
                            </button>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Jumlah
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Kategori
                            </label>
                            <div className="grid grid-cols-4 gap-1.5">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setCategory(cat.id)}
                                        className={`flex flex-col items-center gap-0.5 p-2 rounded-lg border-2 transition-all ${category === cat.id
                                            ? 'border-emerald-500 bg-emerald-50 '
                                            : 'border-gray-200 hover:border-gray-300 '
                                            }`}
                                    >
                                        <div
                                            className="w-6 h-6 flex items-center justify-center rounded-md"
                                            style={{ backgroundColor: cat.color }}
                                        >
                                            <CategoryIcon iconName={cat.iconName} className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-[10px] text-gray-600 text-center truncate w-full leading-tight">
                                            {cat.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Tanggal
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Keterangan (opsional)
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Contoh: Makan siang"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!amount || !category}
                            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                        >
                            Simpan Transaksi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
