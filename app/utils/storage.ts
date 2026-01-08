import { Transaction, Budget, SavingsGoal } from '../types';

const TRANSACTIONS_KEY = 'expense_tracker_transactions';
const BUDGETS_KEY = 'expense_tracker_budgets';
const GOALS_KEY = 'expense_tracker_goals';
const THEME_KEY = 'expense_tracker_theme';

// Transaction Storage
export const getTransactions = (): Transaction[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveTransactions = (transactions: Transaction[]): void => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const addTransaction = (transaction: Transaction): Transaction[] => {
    const transactions = getTransactions();
    const updated = [transaction, ...transactions];
    saveTransactions(updated);
    return updated;
};

export const updateTransaction = (id: string, updates: Partial<Transaction>): Transaction[] => {
    const transactions = getTransactions();
    const updated = transactions.map(t =>
        t.id === id ? { ...t, ...updates } : t
    );
    saveTransactions(updated);
    return updated;
};

export const deleteTransaction = (id: string): Transaction[] => {
    const transactions = getTransactions();
    const updated = transactions.filter(t => t.id !== id);
    saveTransactions(updated);
    return updated;
};

// Budget Storage
export const getBudgets = (): Budget[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(BUDGETS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveBudgets = (budgets: Budget[]): void => {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
};

export const addBudget = (budget: Budget): Budget[] => {
    const budgets = getBudgets();
    const filtered = budgets.filter(b => b.category !== budget.category);
    const updated = [...filtered, budget];
    saveBudgets(updated);
    return updated;
};

export const deleteBudget = (id: string): Budget[] => {
    const budgets = getBudgets();
    const updated = budgets.filter(b => b.id !== id);
    saveBudgets(updated);
    return updated;
};

// Savings Goal Storage
export const getSavingsGoals = (): SavingsGoal[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(GOALS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveSavingsGoals = (goals: SavingsGoal[]): void => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

export const addSavingsGoal = (goal: SavingsGoal): SavingsGoal[] => {
    const goals = getSavingsGoals();
    const updated = [...goals, goal];
    saveSavingsGoals(updated);
    return updated;
};

export const updateSavingsGoal = (id: string, updates: Partial<SavingsGoal>): SavingsGoal[] => {
    const goals = getSavingsGoals();
    const updated = goals.map(g =>
        g.id === id ? { ...g, ...updates } : g
    );
    saveSavingsGoals(updated);
    return updated;
};

export const deleteSavingsGoal = (id: string): SavingsGoal[] => {
    const goals = getSavingsGoals();
    const updated = goals.filter(g => g.id !== id);
    saveSavingsGoals(updated);
    return updated;
};

// Theme Storage - Default to light theme
export const getTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    const theme = localStorage.getItem(THEME_KEY);
    // Only return dark if explicitly saved as dark
    if (theme === 'dark') return 'dark';
    return 'light';
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, theme);
};

// Generate unique ID
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
