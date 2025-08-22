import { Container } from "./ui/container"
import { formatCurrency } from "@/app/lib/formatcurrency"

/**
 * Trunkera text till max 20 tecken
 * @param text Text som ska trunkeras
 * @returns Trunkerad text med "..." om den är längre än 20 tecken
 */
function truncate(text: string): string {
  return text.length > 20
    ? text.slice(0, 20).trim() + "..."
    : text
}

/**
 * ExpensesBox
 * ----------------
 * Visar en enkel lista av utgifter i en box med rubrik
 */
export function ExpensesBox() {
  return (
    <Container sizeClass="w-full h-fit flex flex-col" colorClass="bg-white">
      {/* Rubrik */}
      <h3 className="text-center font-bold pb-4">Utgifter</h3>

      {/* Lista av utgifter */}
      <Container sizeClass="w-full h-fit">
        <div className="flex justify-between font-bold">
          {/* Utgiftsbeskrivning */}
          <p>{truncate("Hej detta är en utgift fett nice mmannen")}</p>
          
          {/* Belopp */}
          <div className="text-red-500">- {formatCurrency(100)} KR</div>
        </div>
      </Container>
    </Container>
  )
}
