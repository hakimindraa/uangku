'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Transaction, Budget, SavingsGoal } from '../types';
import * as storage from '../utils/storage';

interface FinanceContextType {
    transactions: Transaction[];
    budgets: Budget[];
    savingsGoals: SavingsGoal[];
    theme: 'light' | 'dark';
    isLoading: boolean;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
    updateTransaction: (id: string, updates: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;
    addBudget: (budget: Omit<Budget, 'id'>) => void;
    deleteBudget: (id: string) => void;
    addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'createdAt'>) => void;
    updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
    deleteSavingsGoal: (id: string) => void;
    toggleTheme: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isLoading, setIsLoading] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        const loadedTransactions = storage.getTransactions();
        const loadedBudgets = storage.getBudgets();
        const loadedGoals = storage.getSavingsGoals();
        const loadedTheme = storage.getTheme();

        setTransactions(loadedTransactions);
        setBudgets(loadedBudgets);
        setSavingsGoals(loadedGoals);
        setTheme(loadedTheme);
        setIsLoading(false);
    }, []);

    // Apply theme to document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
        const newTransaction: Transaction = {
            ...transactionData,
            id: storage.generateId(),
            createdAt: new Date().toISOString(),
        };
        const updated = storage.addTransaction(newTransaction);
        setTransactions(updated);
    }, []);

    const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
        const updated = storage.updateTransaction(id, updates);
        setTransactions(updated);
    }, []);

    const deleteTransaction = useCallback((id: string) => {
        const updated = storage.deleteTransaction(id);
        setTransactions(updated);
    }, []);

    const addBudget = useCallback((budgetData: Omit<Budget, 'id'>) => {
        const newBudget: Budget = {
            ...budgetData,
            id: storage.generateId(),
        };
        const updated = storage.addBudget(newBudget);
        setBudgets(updated);
    }, []);

    const deleteBudget = useCallback((id: string) => {
        const updated = storage.deleteBudget(id);
        setBudgets(updated);
    }, []);

    const addSavingsGoal = useCallback((goalData: Omit<SavingsGoal, 'id' | 'createdAt'>) => {
        const newGoal: SavingsGoal = {
            ...goalData,
            id: storage.generateId(),
            createdAt: new Date().toISOString(),
        };
        const updated = storage.addSavingsGoal(newGoal);
        setSavingsGoals(updated);
    }, []);

    const updateSavingsGoal = useCallback((id: string, updates: Partial<SavingsGoal>) => {
        const updated = storage.updateSavingsGoal(id, updates);
        setSavingsGoals(updated);
    }, []);

    const deleteSavingsGoal = useCallback((id: string) => {
        const updated = storage.deleteSavingsGoal(id);
        setSavingsGoals(updated);
    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        storage.saveTheme(newTheme);
    }, [theme]);

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                budgets,
                savingsGoals,
                theme,
                isLoading,
                addTransaction,
                updateTransaction,
                deleteTransaction,
                addBudget,
                deleteBudget,
                addSavingsGoal,
                updateSavingsGoal,
                deleteSavingsGoal,
                toggleTheme,
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = (): FinanceContextType => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
};
