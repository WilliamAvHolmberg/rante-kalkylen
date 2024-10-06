import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AdditionalInfo() {
  return (
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
  )
}