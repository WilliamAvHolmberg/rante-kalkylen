"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RateOption, Result } from "./types"
import { calculateResults, generateRecommendation } from "./utils"
import LoanInputs from "@/components/LoanInputs"
import FixedRateInputs from "@/components/FixedRateInputs"
import ExpectedRatesInputs from "@/components/ExpectedRatesInputs"
import ResultsTable from "@/components/ResultsTable"
import RecommendationAlert from "@/components/RecommendationAlert"
import AdditionalInfo from "@/components/AdditionalInfo"
import MonthlyBreakdownTable from "@/components/MonthlyBreakdownTable"

export default function RantebindningskalkylatorComponent() {
  const [loanAmount, setLoanAmount] = useState<number>(2000000)
  const [currentVariableRate, setCurrentVariableRate] = useState<number>(3.84)
  const [fixedRateYears, setFixedRateYears] = useState<number>(3)
  const [fixedRatePercentage, setFixedRatePercentage] = useState<number>(2.85)
  const [results, setResults] = useState<Result[] | null>(null)
  const [recommendation, setRecommendation] = useState<string>("")
  const [expectedRates, setExpectedRates] = useState<number[]>([])
  const [startDate, setStartDate] = useState<Date>(new Date())

  const LOCK_PERIOD_MONTHS = 3; // This should match the value in ExpectedRatesChart.tsx

  useEffect(() => {
    // Initialize expectedRates only if it's empty
    if (expectedRates.length === 0) {
      setExpectedRates(Array(Math.ceil(fixedRateYears * 4)).fill(currentVariableRate))
    }
  }, [fixedRateYears, currentVariableRate, expectedRates.length])

  const handleFixedRateYearsChange = (newYears: number) => {
    setFixedRateYears(newYears)
    const newPeriodsCount = Math.ceil(newYears * 4)
    if (newPeriodsCount > expectedRates.length) {
      // If increasing years, add new periods with the current variable rate
      setExpectedRates([...expectedRates, ...Array(newPeriodsCount - expectedRates.length).fill(currentVariableRate)])
    }
    // If decreasing years, the extra periods will be automatically ignored in calculations
  }

  const handleCalculate = () => {
    const rateOptions: RateOption[] = [
      { label: "Rörlig", rate: currentVariableRate, months: 0 },
      { label: `${fixedRateYears} år fast`, rate: fixedRatePercentage, months: fixedRateYears * 12 },
    ]

    const calculatedResults = calculateResults(loanAmount, rateOptions, expectedRates, fixedRateYears * 12)
    setResults(calculatedResults)

    const newRecommendation = generateRecommendation(calculatedResults, currentVariableRate, fixedRateYears * 12)
    setRecommendation(newRecommendation)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Räntebindningskalkylator</CardTitle>
        <CardDescription>
          Jämför rörlig ränta med ett fast räntealternativ för ditt lån
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <LoanInputs
            loanAmount={loanAmount}
            currentVariableRate={currentVariableRate}
            setLoanAmount={setLoanAmount}
            setCurrentVariableRate={setCurrentVariableRate}
          />
          <FixedRateInputs
            fixedRateYears={fixedRateYears}
            fixedRatePercentage={fixedRatePercentage}
            setFixedRateYears={handleFixedRateYearsChange}
            setFixedRatePercentage={setFixedRatePercentage}
          />
          <ExpectedRatesInputs
            expectedRates={expectedRates}
            setExpectedRates={setExpectedRates}
            startDate={startDate}
            setStartDate={setStartDate}
            fixedRateYears={fixedRateYears}
          />
          <Button onClick={handleCalculate}>Beräkna</Button>
          {results && (
            <>
              <ResultsTable results={results} fixedRateYears={fixedRateYears} />
              <RecommendationAlert recommendation={recommendation} />
              <MonthlyBreakdownTable
                loanAmount={loanAmount}
                startDate={startDate}
                fixedRateYears={fixedRateYears}
                fixedRate={fixedRatePercentage}
                expectedRates={expectedRates}
              />
            </>
          )}
          <AdditionalInfo />
        </div>
      </CardContent>
    </Card>
  )
}
