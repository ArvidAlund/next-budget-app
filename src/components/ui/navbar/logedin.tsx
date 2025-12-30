import { House, ArrowLeftRight, Settings, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import HoverIcon from "../hoverIcon"
import { useState, useEffect, useRef } from "react"
import { AddTransactionModal } from "../../transactions/AddTransactionModal"
import { AlertboxContainer } from "../../AlertboxContainer"
import { useWindowWidth } from "../../useWindowWidth"
import { emitEvent } from "@/app/lib/eventbus"

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

const LoggedInNavbar = ({ NavbarHeight }: { NavbarHeight: number }) => {
    const [ addTransaction, setAddTransaction] = useState(false);
  const [ alertType, setAlertType] = useState<"good" | "bad" | "">("");
  const windowWidth = useWindowWidth();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const navbar = headerRef.current;
      if (!navbar) return;
      const translateClass = windowWidth && windowWidth >= 768 ? "-translate-y-full" : "translate-y-full";
      if (window.scrollY > lastScrollY) {
        // Scrollar ner
        navbar.classList.add(translateClass);
      } else {
        // Scrollar upp
        navbar.classList.remove(translateClass);
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
    <header ref={headerRef} style={{ height: NavbarHeight + "px" }} className={`${addTransaction ? 'statc' : 'fixed'} md:static grid grid-cols-10 bottom-0 left-0 w-full bg-primary/20 backdrop-blur-md md:border-0 z-50 lg:h-20 lg:pt-2 lg:pb-2 transition-all duration-300`}>
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
      {addTransaction && (
        <AddTransactionModal onClose={() => {
          setAddTransaction(false)
          emitEvent("modalChange", {opened: false});
        }} onSuccess={(type) => setAlertType(type)}/>
      )}
      {alertType && <AlertboxContainer type={alertType} />}
    </header>
  )
}

export default LoggedInNavbar;