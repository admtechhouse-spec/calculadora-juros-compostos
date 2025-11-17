
import React, { useState, useCallback } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { Results } from './components/Results';
import { InfoSection } from './components/InfoSection';
import type { FormData, CalculationResult } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCalculate = useCallback((formData: FormData) => {
    const { initialValue, monthlyValue, interestRate, interestRatePeriod, period, periodUnit } = formData;

    const monthlyRate = interestRatePeriod === 'annual'
      ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
      : interestRate / 100;

    const totalMonths = periodUnit === 'years' ? period * 12 : period;

    let accumulatedValue = initialValue;
    let totalInvested = initialValue;
    let totalInterest = 0;
    const monthlyData: CalculationResult['monthlyData'] = [];

    monthlyData.push({
      month: 0,
      interest: 0,
      totalInvested,
      totalInterest,
      accumulatedValue,
    });
    
    for (let month = 1; month <= totalMonths; month++) {
      const interestForMonth = accumulatedValue * monthlyRate;
      totalInterest += interestForMonth;
      accumulatedValue += interestForMonth;

      if(month <= totalMonths){
        accumulatedValue += monthlyValue;
        totalInvested += monthlyValue;
      }
      
      monthlyData.push({
        month,
        interest: interestForMonth,
        totalInvested,
        totalInterest,
        accumulatedValue,
      });
    }

    setResults({
      finalValue: accumulatedValue,
      totalInvested: totalInvested,
      totalInterest: totalInterest,
      monthlyData: monthlyData,
    });
  }, []);

  const handleClear = useCallback(() => {
    setResults(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4 sm:p-6 md:p-8">
      <main className="max-w-5xl mx-auto space-y-8">
        <header className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3FA5]">
                Simulador de Juros Compostos
            </h1>
            <p className="text-gray-600 mt-2">
                Veja o poder dos juros compostos e planeje seu futuro financeiro.
            </p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <CalculatorForm onCalculate={handleCalculate} onClear={handleClear} />
        </div>

        {results && (
          <div id="results" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
            <Results data={results} />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
            <InfoSection />
        </div>
      </main>
      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Simulador de Juros Compostos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;