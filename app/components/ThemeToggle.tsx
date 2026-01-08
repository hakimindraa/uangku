'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useFinance } from '../context/FinanceContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useFinance();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 group"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                <SunIcon
                    className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
                        }`}
                />
                <MoonIcon
                    className={`absolute inset-0 w-6 h-6 text-indigo-400 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                        }`}
                />
            </div>
        </button>
    );
}
