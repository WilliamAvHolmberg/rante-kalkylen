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

export default function RantebindningskalkylatorComponent() {
  const [loanAmount, setLoanAmount] = useState<number>(2000000)
  const [currentVariableRate, setCurrentVariableRate] = useState<number>(3.84)
  const [fixedRateYears, setFixedRateYears] = useState<number>(3)
  const [fixedRatePercentage, setFixedRatePercentage] = useState<number>(2.85)
  const [results, setResults] = useState<Result[] | null>(null)
  const [recommendation, setRecommendation] = useState<string>("")
  const [expectedRates, setExpectedRates] = useState<number[]>([])

  useEffect(() => {
    setExpectedRates(Array(fixedRateYears * 12).fill(currentVariableRate))
  }, [fixedRateYears, currentVariableRate])

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
            setFixedRateYears={setFixedRateYears}
            setFixedRatePercentage={setFixedRatePercentage}
          />
          <ExpectedRatesInputs
            expectedRates={expectedRates}
            setExpectedRates={setExpectedRates}
          />
          <Button onClick={handleCalculate}>Beräkna</Button>
          {results && (
            <>
              <ResultsTable results={results} fixedRateYears={fixedRateYears} />
              <RecommendationAlert recommendation={recommendation} />
            </>
          )}
          <AdditionalInfo />
        </div>
      </CardContent>
    </Card>
  )
}