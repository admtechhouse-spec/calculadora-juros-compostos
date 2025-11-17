import React, { useState, useCallback, FormEvent } from 'react';
import type { FormData } from '../types';
import { InputGroup } from './InputGroup';

interface CalculatorFormProps {
  onCalculate: (formData: FormData) => void;
  onClear: () => void;
}

const initialFormData: FormData = {
    initialValue: 0,
    monthlyValue: 0,
    interestRate: 8,
    interestRatePeriod: 'annual',
    period: 10,
    periodUnit: 'years',
};

const formatCurrencyForDisplay = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};


export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, onClear }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'initialValue' || name === 'monthlyValue') {
      const digitsOnly = value.replace(/\D/g, '');
      const numericValue = digitsOnly ? parseFloat(digitsOnly) / 100 : 0;
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
        let processedValue: string | number = value;
        if (type === 'number') {
          processedValue = value === '' ? 0 : parseFloat(value);
          if (processedValue < 0) processedValue = 0;
        }
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
        setTimeout(() => {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
    onClear();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Valor inicial">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">R$</span>
            <input 
                type="text"
                name="initialValue"
                value={formatCurrencyForDisplay(formData.initialValue)}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-right"
            />
        </InputGroup>
        <InputGroup label="Valor mensal">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">R$</span>
            <input 
                type="text"
                name="monthlyValue"
                value={formatCurrencyForDisplay(formData.monthlyValue)}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-right"
            />
        </InputGroup>
        <InputGroup label="Taxa de juros">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">%</span>
            <input 
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                className="w-full pl-7 pr-3 py-2 bg-white border border-r-0 border-gray-400 rounded-l-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                step="0.1"
            />
            <select
                name="interestRatePeriod"
                value={formData.interestRatePeriod}
                onChange={handleChange}
                className="bg-white border border-gray-400 rounded-r-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
                <option value="annual">anual</option>
                <option value="monthly">mensal</option>
            </select>
        </InputGroup>
        <InputGroup label="Período">
            <input 
                type="number"
                name="period"
                value={formData.period}
                onChange={handleChange}
                className="w-full pl-3 pr-3 py-2 bg-white border border-r-0 border-gray-400 rounded-l-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <select
                name="periodUnit"
                value={formData.periodUnit}
                onChange={handleChange}
                className="bg-white border border-gray-400 rounded-r-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
                <option value="years">ano(s)</option>
                <option value="months">mês(es)</option>
            </select>
        </InputGroup>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <button type="submit" className="w-full sm:w-auto bg-red-800 text-white font-bold py-2 px-8 rounded-md hover:bg-red-900 transition-colors duration-300">
            Calcular
        </button>
        <button type="button" onClick={handleClearForm} className="w-full sm:w-auto sm:ml-auto text-gray-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
            Limpar
        </button>
      </div>
    </form>
  );
};