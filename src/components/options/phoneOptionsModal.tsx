"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
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
    { id: "general", name: "Allmänt" },
    { id: "appearance", name: "Utseende" },
    { id: "calendar", name: "Kalender" },
    { id: "notifications", name: "Notifikationer" },
    { id: "privacy", name: "Integritet" },
    { id: "security", name: "Säkerhet" },
    { id: "account", name: "Konto & Synk" },
    { id: "budget", name: "Budget & Transaktioner" },
    { id: "categories", name: "Kategorier" },
];

const PhoneOptionsModal = ({ onClose }: { onClose: () => void }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <section className="relative w-full h-full">
            <div className="flex justify-between items-center w-full mt-4 h-12">
                <button className="p-2 rounded-full" onClick={() => onClose()}>
                    <ArrowLeft size={24} />
                </button>
                <h4>Inställningar</h4>
            </div>

            {/* --- OPTIONS LIST --- */}
            {!selectedOption && (
                <div className="mt-4">
                    {optionsList.map((option) => (
                        <div
                            key={option.id}
                            className="py-4 border-b  text-secondary flex items-center justify-between cursor-pointer transition-all duration-300"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{option.name}</h2>
                                <p className="text-sm text-gray-600">
                                    Inställningar för {option.name.toLowerCase()}.
                                </p>
                            </div>
                            <ChevronLeft size={20} className="rotate-180" />
                        </div>
                    ))}
                </div>
            )}
            
        </section>
    );
};

export default PhoneOptionsModal;
