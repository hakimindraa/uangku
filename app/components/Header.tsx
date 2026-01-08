'use client';

import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur-lg opacity-50"></div>
                            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
                                <CurrencyDollarIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                ExpenseTracker
                            </h1>
                            <p className="text-xs text-gray-500 -mt-0.5">Kelola Keuangan Anda</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
