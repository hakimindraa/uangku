'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon, DocumentTextIcon, TableCellsIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useFinance } from '../context/FinanceContext';
import { exportToCSV, exportMonthlyReport } from '../utils/export';

export default function ExportButton() {
    const { transactions } = useFinance();
    const [isOpen, setIsOpen] = useState(false);

    const handleExportCSV = () => {
        exportToCSV(transactions);
        setIsOpen(false);
    };

    const handleExportReport = () => {
        exportMonthlyReport(transactions);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                        <div className="p-2">
                            <button
                                onClick={handleExportCSV}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <TableCellsIcon className="w-5 h-5 text-emerald-500" />
                                <div>
                                    <p className="font-medium">Export CSV</p>
                                    <p className="text-xs text-gray-500">Semua transaksi</p>
                                </div>
                            </button>
                            <button
                                onClick={handleExportReport}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="font-medium">Laporan Bulanan</p>
                                    <p className="text-xs text-gray-500">Ringkasan bulan ini</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
