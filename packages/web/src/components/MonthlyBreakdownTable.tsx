import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { format, addMonths } from "date-fns"

interface MonthlyBreakdownTableProps {
  loanAmount: number
  startDate: Date
  fixedRateYears: number
  fixedRate: number
  expectedRates: number[]
}

export default function MonthlyBreakdownTable({
  loanAmount,
  startDate,
  fixedRateYears,
  fixedRate,
  expectedRates,
}: MonthlyBreakdownTableProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const totalMonths = fixedRateYears * 12
  const monthlyData = []

  for (let month = 0; month < totalMonths; month++) {
    const date = addMonths(startDate, month)
    const variableRate = expectedRates[Math.floor(month / 3)]
    const variableInterest = (loanAmount * variableRate) / 100 / 12
    const fixedInterest = (loanAmount * fixedRate) / 100 / 12

    monthlyData.push({
      date: format(date, 'MMM yyyy'),
      variableRate: variableRate.toFixed(2),
      variableInterest: variableInterest.toFixed(2),
      fixedRate: fixedRate.toFixed(2),
      fixedInterest: fixedInterest.toFixed(2),
    })
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="outline"
        className="w-full"
      >
        {isExpanded ? (
          <>
            <ChevronUpIcon className="mr-2 h-4 w-4" /> Dölj månadsvis nedbrytning
          </>
        ) : (
          <>
            <ChevronDownIcon className="mr-2 h-4 w-4" /> Visa månadsvis nedbrytning
          </>
        )}
      </Button>
      {isExpanded && (
        <Table>
          <TableCaption>Månadsvis räntejämförelse över {fixedRateYears} år</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Månad</TableHead>
              <TableHead>Rörlig ränta (%)</TableHead>
              <TableHead>Rörlig ränta (kr)</TableHead>
              <TableHead>Fast ränta (%)</TableHead>
              <TableHead>Fast ränta (kr)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.variableRate}%</TableCell>
                <TableCell>{data.variableInterest} kr</TableCell>
                <TableCell>{data.fixedRate}%</TableCell>
                <TableCell>{data.fixedInterest} kr</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
