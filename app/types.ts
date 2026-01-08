// Transaction types
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string; // ISO date string
  createdAt: string;
}

// Budget types
export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: 'monthly' | 'weekly';
}

// Savings Goal types
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string; // ISO date string
  createdAt: string;
}

// Category presets - using icon names that map to Heroicons
export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Makanan', iconName: 'cake', color: '#f97316' },
  { id: 'transport', name: 'Transport', iconName: 'truck', color: '#3b82f6' },
  { id: 'shopping', name: 'Belanja', iconName: 'shopping-bag', color: '#ec4899' },
  { id: 'bills', name: 'Tagihan', iconName: 'document-text', color: '#8b5cf6' },
  { id: 'entertainment', name: 'Hiburan', iconName: 'film', color: '#f43f5e' },
  { id: 'health', name: 'Kesehatan', iconName: 'heart', color: '#10b981' },
  { id: 'education', name: 'Pendidikan', iconName: 'academic-cap', color: '#0ea5e9' },
  { id: 'savings', name: 'Tabungan', iconName: 'banknotes', color: '#8b5cf6' },
  { id: 'other', name: 'Lainnya', iconName: 'cube', color: '#6b7280' },
] as const;

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Gaji', iconName: 'banknotes', color: '#10b981' },
  { id: 'freelance', name: 'Freelance', iconName: 'computer-desktop', color: '#3b82f6' },
  { id: 'investment', name: 'Investasi', iconName: 'arrow-trending-up', color: '#8b5cf6' },
  { id: 'gift', name: 'Hadiah', iconName: 'gift', color: '#ec4899' },
  { id: 'other', name: 'Lainnya', iconName: 'cube', color: '#6b7280' },
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]['id'];
export type IncomeCategory = typeof INCOME_CATEGORIES[number]['id'];
export type IconName = typeof EXPENSE_CATEGORIES[number]['iconName'] | typeof INCOME_CATEGORIES[number]['iconName'];

// Chart data types
export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}
