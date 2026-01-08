import { Transaction, EXPENSE_CATEGORIES, INCOME_CATEGORIES, ChartData, MonthlyData } from '../types';

// Format currency to IDR
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// Format date to Indonesian format
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
};

// Format date for input
export const formatDateForInput = (date: Date = new Date()): string => {
    return date.toISOString().split('T')[0];
};

// Calculate total balance
export const calculateBalance = (transactions: Transaction[]): number => {
    return transactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
};

// Calculate total income
export const calculateTotalIncome = (transactions: Transaction[]): number => {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
};

// Calculate total expense
export const calculateTotalExpense = (transactions: Transaction[]): number => {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
};

// Get category info
export const getCategoryInfo = (categoryId: string, type: 'income' | 'expense') => {
    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return categories.find(c => c.id === categoryId) || categories[categories.length - 1];
};

// Group transactions by category for chart
export const groupByCategory = (transactions: Transaction[], type: 'expense' | 'income'): ChartData[] => {
    const filtered = transactions.filter(t => t.type === type);
    const grouped = filtered.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([category, value]) => {
        const info = getCategoryInfo(category, type);
        return {
            name: info.name,
            value,
            color: info.color,
        };
    }).sort((a, b) => b.value - a.value);
};

// Get monthly data for chart
export const getMonthlyData = (transactions: Transaction[], months: number = 6): MonthlyData[] => {
    const result: MonthlyData[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date);

        const monthTransactions = transactions.filter(t => t.date.startsWith(monthKey));

        result.push({
            month: monthName,
            income: calculateTotalIncome(monthTransactions),
            expense: calculateTotalExpense(monthTransactions),
        });
    }

    return result;
};

// Filter transactions by current month
export const getCurrentMonthTransactions = (transactions: Transaction[]): Transaction[] => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return transactions.filter(t => t.date.startsWith(monthKey));
};

// Calculate spending by category for current month
export const getMonthlySpendingByCategory = (transactions: Transaction[]): Record<string, number> => {
    const currentMonth = getCurrentMonthTransactions(transactions);
    return currentMonth
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);
};
