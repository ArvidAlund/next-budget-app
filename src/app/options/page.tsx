"use client";

import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import GeneralOptions from "@/components/options/menus/general";

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

function renderContent(selectedOption:string | null) {
  switch (selectedOption) {
    case 'general':
      return <GeneralOptions/>;
    case 'appearance':
      return <div className="p-4">Inställningar för utseende innehåll här.</div>;
    case 'calendar':
      return <div className="p-4">Kalenderinställningar innehåll här.</div>;
    case 'notifications':
      return <div className="p-4">Notifikationsinställningar innehåll här.</div>;
    case 'privacy':
      return <div className="p-4">Integritetsinställningar innehåll här.</div>;
    case 'security':
      return <div className="p-4">Säkerhetsinställningar innehåll här.</div>;
    case 'account':
      return <div className="p-4">Konto- och synkroniseringsinställningar innehåll här.</div>;
    case 'budget':
      return <div className="p-4">Budget- och transaktionsinställningar innehåll här.</div>;
    case 'categories':
      return <div className="p-4">Kategorinställningar innehåll här.</div>;
    default:
      return <div className="p-4">Välj en inställningskategori från vänster.</div>;
  }
}


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
                    <div key={option.id} className="p-4 border-b bg-primary-400 text-secondary flex items-center justify-between hover:bg-primary-300 cursor-pointer transition-all duration-300" onClick={() => setSelectedOption(option.id)}>
                        <div>
                            <h2 className="text-lg font-semibold">{option.name}</h2>
                            <p className="text-sm text-gray-600">Inställningar för {option.name.toLowerCase()}.</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className={`${selectedOption === option.id ? "rotate-180" : "rotate-0"} transition-all duration-300`}/>
                    </div>
                ))}
            </div>
            <div className={`sm:border-l sm:block ${selectedOption ? 'fixed top-0 left-0 w-full sm:relative' : 'hidden'}`}>
                <div ref={contentRef} className="p-4 sm:border-l min-h-screen bg-primary-100 relative">
                    <button className="fixed top-4 right-4 block sm:hidden" onClick={() => setSelectedOption("")}><FontAwesomeIcon icon={faX} className="text-secondary fa-lg" /></button>
                    {renderContent(selectedOption)}
                </div>
            </div>
        </main>
    </>
  );
}