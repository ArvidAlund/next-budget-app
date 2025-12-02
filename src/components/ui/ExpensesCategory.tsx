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
  budgetsum: number
  percentageValue:number
  expense:number
  name: string
}

/**
 * Render a clickable expense category row with icon, progress bar, and budget summary, and show an expanded detail panel when opened.
 *
 * @param image - FontAwesome icon definition for the category icon
 * @param imageclr - Optional CSS class(es) applied to the icon for color/styling
 * @param name - Display name of the category
 * @param category - Identifier or key used to load the expanded category details
 * @param budgetsum - Total budget amount for the category
 * @param percentageValue - Progress value (0–100) shown in the progress bar
 * @param expense - Amount spent in the category
 * @returns A JSX element containing the category row and, when opened, the expanded category menu
 */
export function ExpensesCategory({
  image,
  imageclr,
  name,
  category,
  budgetsum,
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
        <div className="flex flex-col text-left  w-[60%] justify-center sm:justify-between h-10">
          <p className="font-medium text-md">{name}</p>
          <ProgressBar value={percentageValue}/>
        </div>
        <div className="flex flex-col text-right  w-1/3 items-end h-10 ml-auto justify-between">
          <p className="text-md font-bold">{formatCurrency(expense) + " kr"}</p>
          <p className="text-xs font-medium text-muted-foreground">
            {formatCurrency(budgetsum - expense) + " kr"}
          </p>
        </div>
      </div>
      {expandOpen ? <ExpandedMenuCategory category={category} name={name} onClose={() => setExpandOpen(false)} /> : null}
    </>
  )
}