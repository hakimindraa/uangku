'use client';

import { PlusIcon } from '@heroicons/react/24/solid';

interface FloatingButtonProps {
    onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
            aria-label="Tambah transaksi"
        >
            <PlusIcon className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
        </button>
    );
}
