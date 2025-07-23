import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { ProgressBar } from "./progressbar"
import { formatCurrency } from "@/lib/formatcurrency"

type categoryWProps = {
  image: IconDefinition
  imageclr?: string
  category: string
  totsum: number
  percentageValue:number
  expense:number
}

export function ExpensesCategory({
  image,
  imageclr,
  category,
  totsum,
  percentageValue,
  expense
}: categoryWProps) {



  return (
    <div className="flex flex-row items-center text-center gap-2 h-15">
      <div className="flex justify-center items-center min-w-fit">
        <FontAwesomeIcon icon={image} className={`${imageclr} text-[2rem] mr-2`} />
      </div>
      <div className="flex flex-col text-left text-black w-[60%] justify-between h-10">
        <p className="font-medium text-md">{category}</p>
        <ProgressBar value={percentageValue} />
      </div>
      <div className="flex flex-col text-right text-black w-1/3 items-end h-10 ml-auto justify-between">
        <p className="text-md font-bold">{formatCurrency(expense) + " kr"}</p>
        <p className="text-xs font-medium text-muted-foreground">
          {formatCurrency(totsum - expense) + " kr kvar"}
        </p>
      </div>
    </div>
  )
}
