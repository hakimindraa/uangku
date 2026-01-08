'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartPieIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useFinance } from '../context/FinanceContext';
import { groupByCategory, getMonthlyData, formatCurrency } from '../utils/helpers';

export default function Charts() {
    const { transactions, theme } = useFinance();

    const expenseByCategory = groupByCategory(transactions, 'expense');
    const monthlyData = getMonthlyData(transactions, 6);

    const hasExpenseData = expenseByCategory.length > 0;
    const hasMonthlyData = monthlyData.some(d => d.income > 0 || d.expense > 0);

    const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

    return (
        <div className="grid gap-6 lg:grid-cols-2 overflow-hidden">
            {/* Pie Chart - Expense by Category */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <ChartPieIcon className="w-5 h-5 text-gray-500" />
                    <h3 className="font-bold text-gray-900 ">
                        Pengeluaran per Kategori
                    </h3>
                </div>

                {hasExpenseData ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-48 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expenseByCategory}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {expenseByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => formatCurrency(value)}
                                        contentStyle={{
                                            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                                            border: 'none',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                        labelStyle={{ color: theme === 'dark' ? '#f3f4f6' : '#111827' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className="flex-1 grid grid-cols-2 gap-2">
                            {expenseByCategory.slice(0, 6).map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-xs text-gray-600 truncate">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-48 flex items-center justify-center text-gray-400 ">
                        <p className="text-sm text-center">Tambahkan pengeluaran untuk melihat grafik</p>
                    </div>
                )}
            </div>

            {/* Bar Chart - Monthly Trend */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <ChartBarIcon className="w-5 h-5 text-gray-500" />
                    <h3 className="font-bold text-gray-900 ">
                        Trend Bulanan
                    </h3>
                </div>

                {hasMonthlyData ? (
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData} barGap={2}>
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: textColor, fontSize: 12 }}
                                    axisLine={{ stroke: gridColor }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: textColor, fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
                                />
                                <Tooltip
                                    formatter={(value: number) => formatCurrency(value)}
                                    contentStyle={{
                                        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}
                                    labelStyle={{ color: theme === 'dark' ? '#f3f4f6' : '#111827' }}
                                />
                                <Legend
                                    iconType="circle"
                                    wrapperStyle={{ paddingTop: '10px' }}
                                />
                                <Bar
                                    dataKey="income"
                                    name="Pemasukan"
                                    fill="#10b981"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="expense"
                                    name="Pengeluaran"
                                    fill="#ef4444"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-48 flex items-center justify-center text-gray-400 ">
                        <p className="text-sm text-center">Tambahkan transaksi untuk melihat trend</p>
                    </div>
                )}
            </div>
        </div>
    );
}
