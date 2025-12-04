"use client"

import { House, ArrowLeftRight, Settings, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import HoverIcon from "./ui/hoverIcon"
import { useState, useEffect } from "react"
import { AddTransactionModal } from "./transactions/AddTransactionModal"
import { AlertboxContainer } from "./AlertboxContainer"
import { useWindowWidth } from "./useWindowWidth"

const NavbarHeight = 64; // Höjd i pixlar för navbaren
export { NavbarHeight };

const navbarOptions = {
  home: {
    href: "/",
    icon: House,
    description: "Hem",
  },
  transactions: {
    href: "/transactions",
    icon: ArrowLeftRight,
    description: "Transaktioner",
  },
  options: {
    href: "/options",
    icon: Settings,
    description: "Inställningar",
  },
}

/**
 * Bottom navigation bar that hides when scrolling down and reappears when scrolling up.
 *
 * Renders a fixed, responsive bottom nav for small viewports with navigation icons (Home, Options).
 * On viewports wider than 1024px the TopInfo panel is shown in the left area.
 *
 * @returns The navbar React element.
 */
export function Navbar() {
  const [AddTransaction, setAddTransaction] = useState(false);
  const [ alertType, setAlertType] = useState<"good" | "bad" | "">("");
  const windowWidth = useWindowWidth();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const navbar = document.querySelector("header");
      if (!navbar) return;
      if (window.scrollY > lastScrollY) {
        // Scrollar ner
        const choice = windowWidth && windowWidth >= 768 ? " -translate-y-full" : " translate-y-full";
        navbar.classList.add(choice);
      } else {
        // Scrollar upp
        const choice = windowWidth && windowWidth >= 768 ? " -translate-y-full" : " translate-y-full";
        navbar.classList.remove(choice);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowWidth]);

  useEffect(() => {
    if (alertType) {
      const timer = setTimeout(() => {
        setAlertType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertType]);

  return (
    <header style={{ height: NavbarHeight + "px" }} className="fixed md:static grid grid-cols-10 bottom-0 left-0 w-full bg-primary/20 backdrop-blur-md md:border-0 z-50 lg:h-20 lg:pt-2 lg:pb-2 transition-all duration-300">
      <Link href="/" className="text-secondary justify-center items-center col-start-1 col-span-2 hidden md:flex">
        <Image
          src="/mascot/img/mascot.png"
          alt="BudgetBuddy Logo"
          className="ml-4 mt-2 mb-2"
          width={50}
          height={50}
        />
        <h5 className="ml-2">BudgetBuddy</h5>
      </Link>
      <nav className="col-start-1 col-span-8 md:col-start-3 md:col-span-4">
        <ul className="h-full flex justify-evenly items-center gap-4">
          {Object.entries(navbarOptions).map(([key, { href, icon, description }]) => (
            <li key={key} className="h-full w-fit flex justify-center items-center">
              <Link href={href} className="relative flex justify-center items-center group">
                <HoverIcon Icon={icon} description={description} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button aria-label="Add expense" onClick={() => setAddTransaction(true)} className="text-secondary justify-center items-center col-start-9 col-span-2 md:col-start-10 md:col-span-1 flex cursor-pointer">
        <Plus size={35}/>
      </button>
      {AddTransaction && (
        <AddTransactionModal onClose={() => setAddTransaction(false)} onSuccess={(type) => setAlertType(type)}/>
      )}
      {alertType && <AlertboxContainer type={alertType} />}
    </header>
  )
}