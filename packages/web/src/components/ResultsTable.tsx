import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Result } from "../app/types"

interface ResultsTableProps {
  results: Result[]
  fixedRateYears: number
}

export default function ResultsTable({ results, fixedRateYears }: ResultsTableProps) {
  return (
    <Table>
      <TableCaption>Jämförelse av räntebindningsalternativ över {fixedRateYears} år</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Alternativ</TableHead>
          <TableHead>Genomsnittlig månadsränta</TableHead>
          <TableHead>Total räntekostnad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result, index) => (
          <TableRow key={index}>
            <TableCell>{result.option}</TableCell>
            <TableCell>{result.monthlyPayment.toFixed(2)} kr</TableCell>
            <TableCell>{result.totalInterest.toFixed(2)} kr</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}