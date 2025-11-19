"use client"

import { useEffect, useState, useRef } from "react"
import { NavIcon } from "./ui/navicon"
import { faHouseUser, faGear } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { TopInfo } from "./Topinfo"
import { useWindowWidth } from "./useWindowWidth"

/**
 * Mobile bottom navigation bar that hides when scrolling down and reappears when scrolling up.
 *
 * Renders a fixed, responsive bottom nav for small viewports with navigation icons (Home, Kalender).
 * On wide viewports it includes a TopInfo section shown when window width is greater than 1024px.
 *
 * @returns A React element that renders the navbar component.
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
        fixed flex flex-row bottom-0 left-0 w-full h-16 bg-secondary text-white px-4 rounded-t-xl shadow-md
        transition-transform duration-300 ease-in-out z-100
        ${hidden ? "translate-y-full" : "translate-y-0"}  /* Döljer/visar navbaren */
        lg:static lg:rounded-md
    `}

    >
      <div className="w-[30%] hidden lg:flex">
        {width > 1024 ? <TopInfo textclr="text-black"/> : null}
      </div>

      <div className="flex justify-around items-center h-full w-[90%] lg:w-[70%]">
        <Link href="/"><NavIcon icon={faHouseUser} label="Hem" /></Link>
        <Link href="/options"><NavIcon icon={faGear} label="Options"/></Link>

      </div>
    </nav>
  )
}