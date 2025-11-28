"use client"

import { useEffect, useState, useRef } from "react"
import { NavIcon } from "./ui/navicon"
import { faHouseUser, faGear } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { TopInfo } from "./Topinfo"
import { useWindowWidth } from "./useWindowWidth"

/**
 * Bottom navigation bar that hides when scrolling down and reappears when scrolling up.
 *
 * Renders a fixed, responsive bottom nav for small viewports with navigation icons (Home, Options).
 * On viewports wider than 1024px the TopInfo panel is shown in the left area.
 *
 * @returns The navbar React element.
 */
export function Navbar() {
  const [hidden, setHidden] = useState(false) // Om navbaren ska döljas
  const lastScrollY = useRef(0)              // Senaste scroll-positionen
  const width = useWindowWidth();

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
        fixed flex flex-row bottom-0 left-0 w-full h-16 bg-secondary text-white rounded-t-xl shadow-md
        transition-transform duration-300 ease-in-out z-100 overflow-hidden
        ${hidden ? "translate-y-full" : "translate-y-0"} 
        lg:static lg:rounded-md
    `}

    >
      <div className="w-[30%] hidden lg:flex">
        {width > 1024 ? <TopInfo /> : null}
      </div>

      <div className="flex justify-around items-center h-full w-[90%] lg:w-[70%]">
        <Link href="/"><NavIcon icon={faHouseUser} label="Hem" /></Link>
        <Link href="/options"><NavIcon icon={faGear} label="Options"/></Link>

      </div>
    </nav>
  )
}