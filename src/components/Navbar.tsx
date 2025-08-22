import { useEffect, useState, useRef } from "react"
import { NavIcon } from "./ui/navicon"
import { faHouseUser, faCalendar } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

/**
 * Navbar
 * ----------------
 * Mobilnavigationsbar som döljer sig vid scroll ner och visas vid scroll upp.
 */
export function Navbar() {
  const [hidden, setHidden] = useState(false) // Om navbaren ska döljas
  const lastScrollY = useRef(0)              // Senaste scroll-positionen

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Scrollar ner → dölj navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHidden(true)
      }
      // Scrollar upp → visa navbar
      else {
        setHidden(false)
      }

      // Uppdatera senaste scroll-position
      lastScrollY.current = currentScrollY
    }

    // Lyssna på scroll-event
    window.addEventListener("scroll", handleScroll)

    // Rensa eventlistener vid unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`
        fixed bottom-0 left-0 w-full h-16 bg-secondary text-white px-4 rounded-t-xl shadow-md
        transition-transform duration-300 ease-in-out
        ${hidden ? "translate-y-full" : "translate-y-0"}  /* Döljer/visar navbaren */
      `}
    >
      <div className="flex justify-around items-center h-full w-[90%]">
        {/* Hem-ikon */}
        <Link href="/"><NavIcon icon={faHouseUser} label="Hem" /></Link>
        {/* Kalender-ikon */}
        <a href="/kalender"><NavIcon icon={faCalendar} label="Kalender"/></a>
        {/* Fler ikoner kan läggas till här */}
      </div>
    </nav>
  )
}
