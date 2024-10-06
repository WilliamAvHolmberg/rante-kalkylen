"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { RateOption, Result } from "./types"
import { calculateResults, generateRecommendation } from "./utils"

const defaultRateOptions: RateOption[] = [
  { label: "Rörlig", rate: 3.84, months: 0 },
  { label: "1 år", rate: 3.25, months: 12 },
  { label: "2 år", rate: 2.94, months: 24 },
  { label: "3 år", rate: 2.85, months: 36 },
]

export default function RantebindningskalkylatorComponent() {
  const [loanAmount, setLoanAmount] = useState<number>(2000000)
  const [currentVariableRate, setCurrentVariableRate] = useState<number>(3.84)
  const [currentPolicyRate, setCurrentPolicyRate] = useState<number>(3.0)
  const [rateOptions, setRateOptions] = useState<RateOption[]>(defaultRateOptions)
  const [results, setResults] = useState<Result[] | null>(null)
  const [recommendation, setRecommendation] = useState<string>("")
  const [expectedRates, setExpectedRates] = useState<number[]>(Array(60).fill(currentVariableRate))

  const maxPeriod = useMemo(() => Math.max(...rateOptions.map(option => option.months)), [rateOptions])

  const handleCalculate = () => {
    const calculatedResults = calculateResults(loanAmount, rateOptions, expectedRates, maxPeriod)
    setResults(calculatedResults)

    const newRecommendation = generateRecommendation(calculatedResults, currentVariableRate, currentPolicyRate, maxPeriod)
    setRecommendation(newRecommendation)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Räntebindningskalkylator</CardTitle>
        <CardDescription>
          Jämför olika räntebindningsalternativ för att hitta det bästa erbjudandet för ditt lån
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
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
            <div className="grid gap-2">
              <Label htmlFor="currentPolicyRate">Nuvarande styrränta (%)</Label>
              <Input
                id="currentPolicyRate"
                type="number"
                step="0.01"
                value={currentPolicyRate}
                onChange={(e) => setCurrentPolicyRate(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Räntebindningsalternativ</h3>
            {rateOptions.map((option, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <Label htmlFor={`rateOption${index}`}>{option.label}</Label>
                <Input
                  id={`rateOption${index}`}
                  type="number"
                  step="0.01"
                  value={option.rate}
                  onChange={(e) => {
                    const newOptions = [...rateOptions]
                    newOptions[index].rate = Number(e.target.value)
                    setRateOptions(newOptions)
                  }}
                  disabled={option.label === "Rörlig"}
                />
                <Input
                  type="number"
                  value={option.months}
                  onChange={(e) => {
                    const newOptions = [...rateOptions]
                    newOptions[index].months = Number(e.target.value)
                    setRateOptions(newOptions)
                  }}
                  disabled={option.label === "Rörlig"}
                />
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Förväntad rörlig ränta (%)</h3>
            <div className="grid grid-cols-4 gap-4">
              {expectedRates.slice(0, 12).map((rate, index) => (
                <div key={index} className="grid gap-2">
                  <Label htmlFor={`expectedRate${index}`}>Månad {index + 1}</Label>
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
          <Button onClick={handleCalculate}>Beräkna</Button>
          {results && (
            <div className="grid gap-4">
              <Table>
                <TableCaption>Jämförelse av räntebindningsalternativ över {maxPeriod / 12} år</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alternativ</TableHead>
                    <TableHead>Genomsnittlig månadsränta</TableHead>
                    <TableHead>Total räntekostnad</TableHead>
                    <TableHead>Total kostnad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.option}</TableCell>
                      <TableCell>{result.monthlyPayment.toFixed(2)} kr</TableCell>
                      <TableCell>{result.totalInterest.toFixed(2)} kr</TableCell>
                      <TableCell>{result.totalCost.toFixed(2)} kr</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Rekommendation</AlertTitle>
                <AlertDescription>{recommendation}</AlertDescription>
              </Alert>
            </div>
          )}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Ytterligare information</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Styrräntan är en viktig faktor för att bestämma marknadsräntorna. En högre styrränta leder vanligtvis till högre låneräntor och vice versa.</li>
                  <li>Skillnaden mellan den nuvarande rörliga räntan och styrräntan kan indikera potentiella framtida ränterörelser.</li>
                  <li>Denna kalkylator tar inte hänsyn till amorteringar, utan fokuserar enbart på räntekostnader.</li>
                  <li>För bindningstider kortare än den längsta perioden antas lånet övergå till rörlig ränta efter bindningstidens slut.</li>
                  <li>Var medveten om eventuella avgifter som är förknippade med att binda räntan.</li>
                  <li>Kom ihåg att räntor kan gå upp eller ner, och tidigare utveckling garanterar inte framtida resultat.</li>
                  <li>Denna kalkylator ger en förenklad jämförelse och tar inte hänsyn till alla faktorer som kan påverka ditt lån.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}