import { useEffect, useState } from "react"
import { NavIcon } from "./ui/navicon"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

/**
 * Props för AddExpenseBtn-komponenten
 * @property onClick - Callback som körs när knappen klickas
 */
type AddExpenseBtnProps = {
  onClick: () => void
}

/**
 * AddExpenseBtn
 * 
 * En flytande knapp som visas längst ner till höger på sidan.
 * Knappen döljs automatiskt när användaren scrollar ner mer än 100px,
 * och visas igen när scrollpositionen är mindre än 100px.
 * 
 * Används för att lägga till en ny kostnad eller inkomst.
 */
export function AddExpenseBtn({ onClick }: AddExpenseBtnProps) {
  // State som avgör om knappen ska vara synlig
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    /**
     * Hanterar scroll-händelsen.
     * Om scrollY är mindre än 100 visas knappen, annars döljs den.
     */
    const handleScroll = () => {
      setVisible(window.scrollY < 100)
    }

    // Lägg till scroll-lyssnare
    window.addEventListener("scroll", handleScroll)
    
    // Ta bort lyssnare när komponenten avmonteras
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      onClick={onClick} // Kör callback när knappen klickas
      className={`
        fixed bottom-10 right-4       /* Position längst ner till höger */
        bg-amber-400 p-3             /* Bakgrundsfärg och padding */
        rounded-[25%]                /* Rundade hörn */
        cursor-pointer               /* Visa hand-pekare vid hover */
        transition-opacity duration-500 ease-in-out /* Smooth fade-in/out */
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"} /* Dölj eller visa knapp */
      `}
      role="button" 
      aria-label="Lägg till ny kostnad eller inkomst"
    >
      {/* NavIcon med plus-ikon */}
      <NavIcon icon={faPlus} label="ny kostnad/inkomst" color="text-white" />
    </div>
  )
}
