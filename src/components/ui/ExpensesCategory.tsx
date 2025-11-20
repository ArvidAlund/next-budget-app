import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { ProgressBar } from "./progressbar"
import { formatCurrency } from "@/app/lib/formatcurrency"
import { useState } from "react"
import { ExpandedMenuCategory } from "../visibleData/ExpandedMenuCategory"

type categoryWProps = {
  image: IconDefinition
  imageclr?: string
  category: string
  totsum: number
  percentageValue:number
  expense:number
  name: string
}

export function ExpensesCategory({
  image,
  imageclr,
  name,
  category,
  totsum,
  percentageValue,
  expense
}: categoryWProps) {

  const [expandOpen, setExpandOpen] = useState(false);

  const handleCategoryClick = () =>{
    setExpandOpen(true)
  }


  return (
    <>
      <div className="flex flex-row items-center text-center gap-2 h-15 select-none cursor-pointer" onClick={handleCategoryClick}>
        <div className="flex justify-center items-center min-w-fit">
          <FontAwesomeIcon icon={image} className={`${imageclr} text-[2rem] mr-2 text-secondary-100`} />
        </div>
        <div className="flex flex-col text-left  w-[60%] justify-between h-10">
          <p className="font-medium text-md">{name}</p>
          <ProgressBar value={percentageValue}/>
        </div>
        <div className="flex flex-col text-right  w-1/3 items-end h-10 ml-auto justify-between">
          <p className="text-md font-bold">{formatCurrency(expense) + " kr"}</p>
          <p className="text-xs font-medium text-muted-foreground">
            {formatCurrency(totsum - expense) + " kr"}
          </p>
        </div>
      </div>
      {expandOpen ? <ExpandedMenuCategory category={category} onClose={() => setExpandOpen(false)} /> : null}
    </>
  )
}
