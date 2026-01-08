import { Transaction } from '../types';
import { formatCurrency, formatDate, calculateBalance, calculateTotalIncome, calculateTotalExpense, getCategoryInfo, getCurrentMonthTransactions } from './helpers';

// Export transactions to CSV
export const exportToCSV = (transactions: Transaction[]): void => {
    const headers = ['Tanggal', 'Kategori', 'Tipe', 'Jumlah', 'Keterangan'];

    const rows = transactions.map(t => {
        const categoryInfo = getCategoryInfo(t.category, t.type);
        return [
            formatDate(t.date),
            categoryInfo.name,
            t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
            t.amount.toString(),
            t.description || '-'
        ];
    });

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    downloadFile(csvContent, 'transaksi.csv', 'text/csv');
};

// Export monthly report to CSV
export const exportMonthlyReport = (transactions: Transaction[]): void => {
    const monthlyTransactions = getCurrentMonthTransactions(transactions);
    const totalIncome = calculateTotalIncome(monthlyTransactions);
    const totalExpense = calculateTotalExpense(monthlyTransactions);
    const balance = calculateBalance(transactions);

    const now = new Date();
    const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(now);

    let report = `LAPORAN KEUANGAN - ${monthName.toUpperCase()}\n`;
    report += `${'='.repeat(50)}\n\n`;
    report += `Total Saldo: ${formatCurrency(balance)}\n`;
    report += `Pemasukan Bulan Ini: ${formatCurrency(totalIncome)}\n`;
    report += `Pengeluaran Bulan Ini: ${formatCurrency(totalExpense)}\n`;
    report += `Selisih: ${formatCurrency(totalIncome - totalExpense)}\n\n`;
    report += `${'='.repeat(50)}\n`;
    report += `DETAIL TRANSAKSI\n`;
    report += `${'='.repeat(50)}\n\n`;

    if (monthlyTransactions.length === 0) {
        report += 'Tidak ada transaksi bulan ini.\n';
    } else {
        monthlyTransactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .forEach(t => {
                const categoryInfo = getCategoryInfo(t.category, t.type);
                const sign = t.type === 'income' ? '+' : '-';
                report += `${formatDate(t.date)} | ${categoryInfo.name}\n`;
                report += `${sign}${formatCurrency(t.amount)}`;
                if (t.description) report += ` - ${t.description}`;
                report += '\n\n';
            });
    }

    report += `${'='.repeat(50)}\n`;
    report += `Diekspor pada: ${new Date().toLocaleString('id-ID')}\n`;

    downloadFile(report, `laporan-${now.getFullYear()}-${now.getMonth() + 1}.txt`, 'text/plain');
};

// Helper to download file
const downloadFile = (content: string, filename: string, mimeType: string): void => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
