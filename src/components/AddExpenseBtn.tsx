import { useEffect, useState } from "react"
import { NavIcon } from "./ui/navicon"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

type AddExpenseBtnProps = {
  onClick: () => void
}

export function AddExpenseBtn({ onClick }: AddExpenseBtnProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      onClick={onClick}
      className={`
        fixed bottom-10 right-4 bg-amber-400 p-3 rounded-[25%] cursor-pointer
        transition-opacity duration-500 ease-in-out
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <NavIcon icon={faPlus} label="ny kostnad/inkomst" color="text-white" />
    </div>
  )
}
