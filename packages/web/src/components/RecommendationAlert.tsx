import React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface RecommendationAlertProps {
  recommendation: string
}

export default function RecommendationAlert({ recommendation }: RecommendationAlertProps) {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Rekommendation</AlertTitle>
      <AlertDescription>{recommendation}</AlertDescription>
    </Alert>
  )
}