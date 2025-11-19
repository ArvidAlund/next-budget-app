"use client";

import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import GeneralOptions from "@/components/options/menus/general";
import AppearanceOptions from "@/components/options/menus/appearance";
import CalendarOptions from "@/components/options/menus/calendar";
import PrivacyOptions from "@/components/options/menus/privacy";
import SecurityOptions from "@/components/options/menus/security";
import AccountOptions from "@/components/options/menus/account";
import BudgetOptions from "@/components/options/menus/budget";
import CategoriesOptions from "@/components/options/menus/categories";
import NotificationsOptions from "@/components/options/menus/notifications";
import QuickOptions from "@/components/options/menus/quick";

const optionsList = [
  { id: 'general', name: 'Allmänt' },
  { id: 'appearance', name: 'Utseende' },
  { id: 'calendar', name: 'Kalender' },
  { id: 'notifications', name: 'Notifikationer' },
  { id: 'privacy', name: 'Integritet' },
  { id: 'security', name: 'Säkerhet' },
  { id: 'account', name: 'Konto & Synk' },
  { id: 'budget', name: 'Budget & Transaktioner' },
  { id: 'categories', name: 'Kategorier' },
];

/**
 * Renders the options content component corresponding to the selected option id.
 *
 * @param selectedOption - The id of the selected option (e.g. 'general', 'appearance', 'calendar', 'notifications', 'privacy', 'security', 'account', 'budget', 'categories'); `null` or any unrecognized value shows the default QuickOptions view.
 * @returns The React element for the matching options panel; `QuickOptions` when no matching id is provided.
 */
function renderContent(selectedOption:string | null) {
  switch (selectedOption) {
    case 'general':
      return <GeneralOptions/>;
    case 'appearance':
      return <AppearanceOptions/>;
    case 'calendar':
      return <CalendarOptions/>;
    case 'notifications':
      return <NotificationsOptions/>;
    case 'privacy':
      return <PrivacyOptions/>;
    case 'security':
      return <SecurityOptions/>;
    case 'account':
      return <AccountOptions/>;
    case 'budget':
      return <BudgetOptions/>;
    case 'categories':
      return <CategoriesOptions/>;
    default:
      return <QuickOptions/>;
  }
}


/**
 * Renders the two-pane options/settings page with selectable categories and an animated detail pane.
 *
 * The left column displays a list of option categories; selecting a category opens the right detail pane and animates it into view. On small screens the detail pane includes a dismiss control that closes the pane.
 *
 * @returns The React element representing the options page layout.
 */
export default function OptionsPage() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { x: "100%" },
            { x: 0, duration: 0.5, ease: "power2.out" }
        );
    }, [selectedOption]);
  return (
    <>
        <main className="grid sm:grid-cols-2 overflow-x-hidden">
            <div>
                {optionsList.map(option => (
                    <div key={option.id} className="p-4 border-b bg-primary-400 text-secondary flex items-center justify-between hover:bg-primary-300 cursor-pointer transition-all duration-300" onClick={() => setSelectedOption(() => option.id === selectedOption ? "" : option.id)}>
                        <div>
                            <h2 className="text-lg font-semibold">{option.name}</h2>
                            <p className="text-sm text-gray-600">Inställningar för {option.name.toLowerCase()}.</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className={`${selectedOption === option.id ? "rotate-180" : "rotate-0"} transition-all duration-300`}/>
                    </div>
                ))}
            </div>
            <div className={`sm:border-l sm:block ${selectedOption ? 'absolute top-0 left-0 w-full sm:relative' : 'hidden'}`}>
                <div ref={contentRef} className="p-4 sm:border-l min-h-screen bg-primary-100 relative">
                    <button className="fixed top-4 right-4 block sm:hidden" onClick={() => setSelectedOption("")}><FontAwesomeIcon icon={faX} className="text-secondary fa-lg" /></button>
                    {renderContent(selectedOption)}
                </div>
            </div>
        </main>
    </>
  );
}