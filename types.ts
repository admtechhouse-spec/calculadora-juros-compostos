
export interface FormData {
  initialValue: number;
  monthlyValue: number;
  interestRate: number;
  interestRatePeriod: 'monthly' | 'annual';
  period: number;
  periodUnit: 'months' | 'years';
}

export interface MonthlyData {
  month: number;
  interest: number;
  totalInvested: number;
  totalInterest: number;
  accumulatedValue: number;
}

export interface CalculationResult {
  finalValue: number;
  totalInvested: number;
  totalInterest: number;
  monthlyData: MonthlyData[];
}
