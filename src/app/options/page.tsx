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
import getUserOption from "../lib/db/getUserOption";
import LockScreen from "@/components/lockScreen";
import supabase from "../lib/supabaseClient";
import { ArrowLeft } from "lucide-react";

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
export default function OptionsPage({ onClose }: { onClose?: () => void }) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [locked, setLocked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasSession, setHasSession] = useState<boolean>(false);

    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { x: "100%" },
            { x: 0, duration: 0.5, ease: "power2.out" }
        );
    }, [selectedOption]);

    useEffect(() => {
        const checkLock = async () => {
          const lockSetting = await getUserOption('app_lock');
          if (typeof lockSetting === 'boolean' && lockSetting) {
            setLocked(true);
          }
        }

        const getSession = async () => {
          const { data, error } = await supabase.auth.getSession()
          if (error) {
            console.error("Error fetching session:", error.message)
            return null
          }
          const session = data.session;
          setHasSession(session !== null);

          if (session !== null) {
            await checkLock();
          }
          setLoading(false);
        }
        getSession();
    }, []);
    const handleUnlock = () => {
        setLocked(false);
    }


    if (loading) return null;
    if (locked) return <LockScreen onUnlock={handleUnlock} />;
    if (!hasSession) {
        window.location.href = '/404';
        return null;
    }

  return (
    <>
        <main className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen w-full relative sm:fixed sm:z-200 bg-black">
            <div className="flex lg:hidden justify-between items-center w-full mt-4 h-12 px-2">
                <button className="p-2 rounded-full" onClick={onClose}>
                    <ArrowLeft size={24} />
                </button>
                <h4>Inställningar</h4>
            </div>
            <div className="flex-1 flex flex-col justify-between">
                {optionsList.map(option => (
                    <div key={option.id} className="p-4 border-b text-secondary flex items-center justify-between hover:bg-primary-300 cursor-pointer transition-all duration-300 h-full" onClick={() => setSelectedOption(() => option.id === selectedOption ? "" : option.id)}>
                        <div>
                            <h2 className="text-lg font-semibold">{option.name}</h2>
                            <p className="text-sm text-gray-600">Inställningar för {option.name.toLowerCase()}.</p>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className={`${selectedOption === option.id ? "rotate-180" : "rotate-0"} transition-all duration-300`}/>
                    </div>
                ))}
            </div>
            <div className={`sm:border-l sm:block ${selectedOption ? 'absolute top-0 left-0 w-full h-full sm:relative' : 'hidden'}`}>
                <div ref={contentRef} className="p-4 sm:border-l bg-primary-100 relative min-h-screen w-full">
                    <button className="fixed top-4 right-4 block sm:hidden" onClick={() => setSelectedOption("")}><FontAwesomeIcon icon={faX} className="text-secondary fa-lg" /></button>
                    {renderContent(selectedOption)}
                </div>
            </div>
        </main>
    </>
  );
}