import React from 'react';
import type { CalculationResult } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  data: CalculationResult;
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const Results: React.FC<ResultsProps> = ({ data }) => {
    const chartData = data.monthlyData.map(d => ({
        periodo: d.month,
        'Valor Investido': parseFloat(d.totalInvested.toFixed(2)),
        'Total Acumulado': parseFloat(d.accumulatedValue.toFixed(2)),
    }));

    const periodUnit = data.monthlyData.length - 1 > 24 ? 'Anos' : 'Meses';
    const chartDataTransformed = periodUnit === 'Anos'
      ? chartData.filter(d => d.periodo % 12 === 0 || d.periodo === 0).map(d => ({...d, periodo: d.periodo / 12}))
      : chartData;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-red-800 mb-4">Resultado</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-red-800 text-white shadow">
                        <p className="text-sm">Valor total final</p>
                        <p className="text-2xl font-bold">{formatCurrency(data.finalValue)}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white border border-gray-200 shadow">
                        <p className="text-sm text-gray-600">Valor total investido</p>
                        <p className="text-2xl font-bold text-gray-800">{formatCurrency(data.totalInvested)}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white border border-gray-200 shadow">
                        <p className="text-sm text-gray-600">Total em juros</p>
                        <p className="text-2xl font-bold text-gray-800">{formatCurrency(data.totalInterest)}</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-red-800 mb-4">Gráfico:</h3>
                <div className="w-full h-80">
                    <ResponsiveContainer>
                        <LineChart data={chartDataTransformed} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="periodo" label={{ value: periodUnit, position: 'insideBottomRight', offset: -5 }}/>
                            <YAxis tickFormatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(value as number)} />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Legend />
                            <Line type="monotone" dataKey="Valor Investido" stroke="#1f2937" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="Total Acumulado" stroke="#991b1b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-red-800 mb-4">Tabela:</h3>
                <div className="max-h-96 overflow-auto border border-gray-200 rounded-lg shadow-inner">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3">Mês</th>
                                <th scope="col" className="px-6 py-3">Juros</th>
                                <th scope="col" className="px-6 py-3">Total Investido</th>
                                <th scope="col" className="px-6 py-3">Total Juros</th>
                                <th scope="col" className="px-6 py-3">Total Acumulado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.monthlyData.map((row) => (
                                <tr key={row.month} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{row.month}</td>
                                    <td className="px-6 py-4">{formatCurrency(row.interest)}</td>
                                    {/* Fix: Corrected typo in property name from 'totalInvestido' to 'totalInvested'. */}
                                    <td className="px-6 py-4">{formatCurrency(row.totalInvested)}</td>
                                    <td className="px-6 py-4">{formatCurrency(row.totalInterest)}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{formatCurrency(row.accumulatedValue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};