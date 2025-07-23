import { useEffect, useState, useRef } from "react"
import { NavIcon } from "./ui/navicon"
import { faHouseUser, faCalendar } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Scrollar ner ➜ dölj navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHidden(true)
      }
      // Scrollar upp ➜ visa navbar
      else {
        setHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
    className={`
        fixed bottom-0 left-0 w-full h-16 bg-secondary text-white bg-white px-4 rounded-t-xl shadow-md
        transition-transform duration-300 ease-in-out
        ${hidden ? "translate-y-full" : "translate-y-0"}
    `}
    >
        <div className="flex justify-around items-center h-full w-[90%]">
          <Link href="/"><NavIcon icon={faHouseUser} label="Hem" /></Link>
            <a href="/kalender"><NavIcon icon={faCalendar} label="Kalender"/></a>
            {/* fler ikoner */}
        </div>
    </nav>

  )
}
