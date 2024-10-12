import { RateOption, Result } from "./types";

const LOCK_PERIOD_MONTHS = 3; // This should match the value in ExpectedRatesChart.tsx

export function calculateResults(
    loanAmount: number,
    rateOptions: RateOption[],
    expectedRates: number[],
    totalMonths: number
): Result[] {
    return rateOptions.map((option) => {
        let totalInterest = 0;

        for (let month = 0; month < totalMonths; month++) {
            const periodIndex = Math.floor(month / LOCK_PERIOD_MONTHS);
            const rate = option.months === 0 ? expectedRates[periodIndex] : option.rate;
            const monthlyRate = rate / 100 / 12;
            const interest = loanAmount * monthlyRate;
            totalInterest += interest;
        }

        const monthlyPayment = (totalInterest) / totalMonths;

        return {
            option: option.label,
            totalInterest: Math.round(totalInterest),
            effectiveRate: (totalInterest / loanAmount / (totalMonths / 12)) * 100,
            monthlyPayment: monthlyPayment,
        };
    });
}

export function generateRecommendation(
    results: Result[],
    currentVariableRate: number,
    maxPeriod: number
): string {
    const lowestCostOption = results.reduce((prev, current) =>
        prev.totalInterest < current.totalInterest ? prev : current
    );

    const variableRateResult = results.find(result => result.option === "Rörlig");

    if (!variableRateResult) {
        return "Det går inte att generera en rekommendation utan information om den rörliga räntan.";
    }

    const yearsPeriod = maxPeriod / 12;

    let recommendation = `Baserat på beräkningarna är ${lowestCostOption.option} det mest kostnadseffektiva alternativet över ${yearsPeriod} år, med en total räntekostnad på ${lowestCostOption.totalInterest.toFixed(2)} kr. `;

    if (lowestCostOption.option === "Rörlig") {
        recommendation += "Den rörliga räntan verkar vara det bästa alternativet just nu. ";
        recommendation += "Kom ihåg att rörliga räntor kan förändras över tid.";
    } else {
        const savingsAmount = variableRateResult.totalInterest - lowestCostOption.totalInterest;
        recommendation += `Du kan spara ${savingsAmount.toFixed(2)} kr på att välja detta alternativ istället för rörlig ränta.`;
    }

    recommendation += ` Den genomsnittliga månadskostnaden för ${lowestCostOption.option} skulle vara ${lowestCostOption.monthlyPayment.toFixed(2)} kr.`;

    return recommendation;
}
