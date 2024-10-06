import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FixedRateInputsProps {
  fixedRateYears: number
  fixedRatePercentage: number
  setFixedRateYears: (value: number) => void
  setFixedRatePercentage: (value: number) => void
}

export default function FixedRateInputs({
  fixedRateYears,
  fixedRatePercentage,
  setFixedRateYears,
  setFixedRatePercentage,
}: FixedRateInputsProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold">Fast räntealternativ</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fixedRateYears">Antal år</Label>
          <Input
            id="fixedRateYears"
            type="number"
            value={fixedRateYears}
            onChange={(e) => setFixedRateYears(Number(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fixedRatePercentage">Fast ränta (%)</Label>
          <Input
            id="fixedRatePercentage"
            type="number"
            step="0.01"
            value={fixedRatePercentage}
            onChange={(e) => setFixedRatePercentage(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}