import { RateOption, Result } from "./types";

export function calculateResults(
    loanAmount: number,
    rateOptions: RateOption[],
    expectedRates: number[],
    totalMonths: number
): Result[] {
    return rateOptions.map((option) => {
        let totalInterest = 0;

        for (let month = 0; month < totalMonths; month++) {
            const rate = option.months > 0 ? option.rate : expectedRates[month];
            const monthlyInterest = (loanAmount * rate) / 100 / 12;
            totalInterest += monthlyInterest;
        }

        const averageMonthlyInterest = totalInterest / totalMonths;

        return {
            option: option.label,
            monthlyPayment: averageMonthlyInterest,
            totalInterest: totalInterest,
        };
    });
}

export function generateRecommendation(
    results: Result[],
    currentVariableRate: number,
    maxPeriod: number
): string {
    const lowestCostOption = results.reduce((prev, current) =>
        prev.monthlyPayment < current.monthlyPayment ? prev : current
    );

    const variableRateResult = results.find(result => result.option === "Rörlig");

    if (!variableRateResult) {
        return "Det går inte att generera en rekommendation utan information om den rörliga räntan.";
    }

    const yearsPeriod = maxPeriod / 12;

    let recommendation = `Baserat på beräkningarna är ${lowestCostOption.option} det mest kostnadseffektiva alternativet över ${yearsPeriod} år, med en total kostnad på ${lowestCostOption.totalInterest.toFixed(2)} kr. `;

    if (lowestCostOption.option === "Rörlig") {
        recommendation += "Den rörliga räntan verkar vara det bästa alternativet just nu. ";
        recommendation += "Kom ihåg att rörliga räntor kan förändras över tid.";
    } else {
        const savingsAmount = variableRateResult.totalInterest - lowestCostOption.totalInterest;
        recommendation += `Du kan spara ${savingsAmount.toFixed(2)} kr på att välja detta alternativ istället för rörlig ränta.`;
    }

    return recommendation;
}