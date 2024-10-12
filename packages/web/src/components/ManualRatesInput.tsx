import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { format, addMonths } from "date-fns"

const LOCK_PERIOD_MONTHS = 3;

interface ManualRatesInputProps {
  expectedRates: number[]
  setExpectedRates: (rates: number[]) => void
  startDate: Date
}

export default function ManualRatesInput({
  expectedRates,
  setExpectedRates,
  startDate,
}: ManualRatesInputProps) {
  const [currentPeriod, setCurrentPeriod] = useState(0)
  const periodsPerPage = 6

  const handleRateChange = (index: number, value: string) => {
    const newRates = [...expectedRates]
    newRates[index] = parseFloat(value) || 0
    setExpectedRates(newRates)
  }

  const nextPeriod = () => {
    setCurrentPeriod(Math.min(currentPeriod + periodsPerPage, expectedRates.length - periodsPerPage))
  }

  const prevPeriod = () => {
    setCurrentPeriod(Math.max(currentPeriod - periodsPerPage, 0))
  }

  const getPeriodLabel = (index: number) => {
    const date = addMonths(startDate, index * LOCK_PERIOD_MONTHS)
    return format(date, 'MMM yyyy')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button onClick={prevPeriod} disabled={currentPeriod === 0} variant="outline" size="sm">
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {getPeriodLabel(currentPeriod)} - {getPeriodLabel(Math.min(currentPeriod + periodsPerPage - 1, expectedRates.length - 1))}
        </span>
        <Button 
          onClick={nextPeriod} 
          disabled={currentPeriod >= expectedRates.length - periodsPerPage}
          variant="outline"
          size="sm"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {expectedRates.slice(currentPeriod, currentPeriod + periodsPerPage).map((rate, index) => (
          <div key={currentPeriod + index} className="space-y-2">
            <Label htmlFor={`rate-${currentPeriod + index}`} className="text-sm">
              {getPeriodLabel(currentPeriod + index)}
            </Label>
            <div className="relative">
              <Input
                id={`rate-${currentPeriod + index}`}
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => handleRateChange(currentPeriod + index, e.target.value)}
                className="h-8 text-sm pr-8"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
                %
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
