import { Container } from "./ui/container"
import { formatCurrency } from "@/app/lib/formatcurrency"

function truncate(text: string): string {
  return text.length > 20
    ? text.slice(0, 20).trim() + "..."
    : text;
}


export function ExpensesBox(){
    return(
        <Container sizeClass="w-full h-fit flex flex-col" colorClass="bg-white">
            <h3 className="text-center font-bold pb-4">Utgifter</h3>
            <Container sizeClass="w-full h-fit">
                <div className="flex justify-between font-bold">
                    <p>{truncate("Hej detta är en utgift fett nice mmannen")}</p>
                    <div className="text-red-500">- {formatCurrency(100)} KR</div>
                </div>
            </Container>
        </Container>
    )
}