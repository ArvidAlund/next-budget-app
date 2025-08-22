import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { NavIcon } from "./ui/navicon"

/**
 * TopInfo
 * ----------------
 * Visar aktuell månad och datumintervall för månaden tillsammans med en ikon.
 */
export function TopInfo() {
  // Månadsnamn på svenska
  const months: { [key: number]: string } = {
    0: "Januari",
    1: "Februari",
    2: "Mars",
    3: "April",
    4: "Maj",
    5: "Juni",
    6: "Juli",
    7: "Augusti",
    8: "September",
    9: "Oktober",
    10: "November",
    11: "December"
  }

  // Skapa ett Date-objekt för dagens datum
  const today = new Date()
  const currentMonth = months[today.getMonth()] // Hämta aktuellt månadsnamn

  // Beräkna första och sista dagen i månaden
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  // Formatera datumintervallet, t.ex. "1 Augusti – 31 Augusti"
  const monthDates = `${firstDay.getDate()} ${currentMonth} – ${lastDay.getDate()} ${currentMonth}`

  return (
    <div className="flex w-full items-center text-center py-4 gap-2">
      {/* Ikonen – centrerad vertikalt tack vare items-center på överordnad flex */}
      <div className="flex justify-center items-center min-w-fit">
        <NavIcon icon={faCalendarDays} label="Månad" />
      </div>

      {/* Texten – ligger direkt till höger om ikonen */}
      <div className="flex flex-col text-left text-white">
        {/* Aktuell månad */}
        <div className="text-xl font-semibold">{currentMonth}</div>
        {/* Datumintervall för månaden */}
        <div className="text-sm text-muted-foreground">{monthDates}</div>
      </div>
    </div>
  )
}
