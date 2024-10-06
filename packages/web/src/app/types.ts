export interface RateOption {
    label: string;
    rate: number;
    months: number;
}

export interface Result {
    option: string;
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
}