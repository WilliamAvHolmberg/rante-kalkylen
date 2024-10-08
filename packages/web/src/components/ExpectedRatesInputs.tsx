import React from "react"
import ExpectedRatesChart from "./ExpectedRatesChart"

interface ExpectedRatesInputsProps {
  expectedRates: number[]
  setExpectedRates: (rates: number[]) => void
}

export default function ExpectedRatesInputs({
  expectedRates,
  setExpectedRates,
}: ExpectedRatesInputsProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold">Förväntad rörlig ränta (%)</h3>
      <p className="text-sm text-gray-500">Klicka på grafen för att justera räntorna</p>
      <ExpectedRatesChart
        expectedRates={expectedRates}
        setExpectedRates={setExpectedRates}
      />
    </div>
  )
}