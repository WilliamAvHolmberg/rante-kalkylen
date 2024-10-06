import { RateOption, Result } from "./types";

export function calculateResults(
    loanAmount: number,
    rateOptions: RateOption[],
    expectedRates: number[],
    maxPeriod: number
): Result[] {
    return rateOptions.map((option) => {
        let totalInterest = 0;
        let monthlyPayment = 0;

        for (let month = 0; month < maxPeriod; month++) {
            let rate: number;

            if (month < option.months) {
                rate = option.rate / 100 / 12;
            } else {
                rate = expectedRates[month] / 100 / 12;
            }

            monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, maxPeriod)) / (Math.pow(1 + rate, maxPeriod) - 1);
            totalInterest += monthlyPayment - (loanAmount / maxPeriod);
        }

        const totalCost = loanAmount + totalInterest;

        return {
            option: option.label,
            monthlyPayment,
            totalInterest,
            totalCost,
        };
    });
}

export function generateRecommendation(
    results: Result[],
    currentVariableRate: number,
    currentPolicyRate: number,
    maxPeriod: number
): string {
    const lowestCostOption = results.reduce((prev, current) =>
        prev.totalCost < current.totalCost ? prev : current
    );

    const variableRateResult = results.find(result => result.option === "Rörlig");

    if (!variableRateResult) {
        return "Det går inte att generera en rekommendation utan information om den rörliga räntan.";
    }

    const rateDifference = currentVariableRate - currentPolicyRate;
    const yearsPeriod = maxPeriod / 12;

    let recommendation = `Baserat på beräkningarna är ${lowestCostOption.option} det mest kostnadseffektiva alternativet över ${yearsPeriod} år, med en total kostnad på ${lowestCostOption.totalCost.toFixed(2)} kr. `;

    if (lowestCostOption.option === "Rörlig") {
        recommendation += "Den rörliga räntan verkar vara det bästa alternativet just nu. ";
        if (rateDifference > 1) {
            recommendation += "Men var uppmärksam på att den rörliga räntan är betydligt högre än styrräntan, vilket kan tyda på att räntorna kan sjunka i framtiden.";
        } else {
            recommendation += "Skillnaden mellan den rörliga räntan och styrräntan är relativt liten, vilket tyder på en stabil räntemiljö.";
        }
    } else {
        const savingsAmount = variableRateResult.totalCost - lowestCostOption.totalCost;
        recommendation += `Du kan spara ${savingsAmount.toFixed(2)} kr på att välja detta alternativ istället för rörlig ränta.`;
    }

    return recommendation;
}