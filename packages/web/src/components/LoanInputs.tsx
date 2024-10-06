import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoanInputsProps {
  loanAmount: number
  currentVariableRate: number
  setLoanAmount: (value: number) => void
  setCurrentVariableRate: (value: number) => void
}

export default function LoanInputs({
  loanAmount,
  currentVariableRate,
  setLoanAmount,
  setCurrentVariableRate,
}: LoanInputsProps) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="loanAmount">Lånebelopp</Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="currentVariableRate">Nuvarande rörlig ränta (%)</Label>
          <Input
            id="currentVariableRate"
            type="number"
            step="0.01"
            value={currentVariableRate}
            onChange={(e) => setCurrentVariableRate(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}