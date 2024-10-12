import React, { useState } from "react"
import ExpectedRatesChart from "./ExpectedRatesChart"
import ManualRatesInput from "./ManualRatesInput"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface ExpectedRatesInputsProps {
  expectedRates: number[]
  setExpectedRates: (rates: number[]) => void
  startDate: Date
  setStartDate: (date: Date) => void
  fixedRateYears: number
}

export default function ExpectedRatesInputs({
  expectedRates,
  setExpectedRates,
  startDate,
  setStartDate,
  fixedRateYears,
}: ExpectedRatesInputsProps) {
  const [useGraph, setUseGraph] = useState(true)

  const visiblePeriods = Math.ceil(fixedRateYears * 4)

  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold">Förväntad rörlig ränta (%)</h3>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="use-graph"
            checked={useGraph}
            onCheckedChange={setUseGraph}
          />
          <Label htmlFor="use-graph" className="text-sm">
            {useGraph ? "Använd graf" : "Använd manuell inmatning"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="start-date" className="text-sm">
            Startdatum:
          </Label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm"
          />
        </div>
      </div>
      {useGraph ? (
        <>
          <p className="text-sm text-gray-500">Klicka på grafen för att justera räntorna</p>
          <ExpectedRatesChart
            expectedRates={expectedRates.slice(0, visiblePeriods)}
            setExpectedRates={(newRates) => {
              setExpectedRates([...newRates, ...expectedRates.slice(visiblePeriods)])
            }}
            startDate={startDate}
          />
        </>
      ) : (
        <ManualRatesInput
          expectedRates={expectedRates.slice(0, visiblePeriods)}
          setExpectedRates={(newRates) => {
            setExpectedRates([...newRates, ...expectedRates.slice(visiblePeriods)])
          }}
          startDate={startDate}
        />
      )}
    </div>
  )
}
