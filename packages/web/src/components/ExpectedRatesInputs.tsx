import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <div className="grid grid-cols-4 gap-4">
        {expectedRates.map((rate, index) => (
          <div key={index} className="grid gap-2">
            <Label htmlFor={`expectedRate${index}`}>År {Math.floor(index / 12) + 1}, Månad {index % 12 + 1}</Label>
            <Input
              id={`expectedRate${index}`}
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => {
                const newRates = [...expectedRates]
                newRates[index] = Number(e.target.value)
                setExpectedRates(newRates)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}