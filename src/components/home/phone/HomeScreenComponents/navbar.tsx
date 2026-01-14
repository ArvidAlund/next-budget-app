import { Bell, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import supabase from "@/app/lib/supabaseClient";
import gsap from "gsap";
import { animateAwayItemsDuration, animateBackItemsDuration } from "@/app/lib/globalSettings";
import { onEvent } from "@/app/lib/eventbus";
import getNotificationCount from "@/app/lib/db/notifications/getNotificationCount";

type Props = {
    optionsOpen: () => void; 
    notificationsOpen: () => void; 
    settingsOpen: boolean;
};


const PhoneNavbar = ({optionsOpen, notificationsOpen, settingsOpen} : Props) => {
    const [usersFirstInitial, setUsersFirstInitial] = useState<string | null>(null);
    const notificationRef = useRef<HTMLSpanElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const iconRef = useRef<HTMLLIElement>(null);
    const [notificationCount, setNotificationCount] = useState<number>(0);
    const settingsOpenRef = useRef(settingsOpen);

    useEffect(() => {
        const fetchUserInitial = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && user.user_metadata && user.user_metadata.full_name) {
                const fullName: string = user.user_metadata.full_name;
                setUsersFirstInitial(fullName.charAt(0).toUpperCase());
            } else {
                setUsersFirstInitial("U"); // Default initial if no name found
            }
        }

        const fetchNotificationCount = async () => {
            try {
                const count = await getNotificationCount();
                setNotificationCount(count);
            } catch (error) {
                console.error("Error fetching notification count:", error);
            }
        }

        if (navRef.current) {
            gsap.fromTo(
                navRef.current,
                { opacity: 0, y: '-100%' },
                { opacity: 1, y: '0%', duration: 0.5, ease: "power2.out", delay: 0.2 }
            );
        }

        const unsubscribe = onEvent("animateAwayItems", () => {
            if (navRef.current && !settingsOpenRef.current) {
                gsap.to(navRef.current, {
                    y: "-150%",
                    opacity: 0,
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                });
            }
        });
        const unsubscribeBack = onEvent("animateBackItems", () => {
            if (navRef.current && !settingsOpenRef.current) {
                gsap.to(navRef.current, {
                    y: "0%",
                    opacity: 1,
                    duration: animateBackItemsDuration,
                    ease: "power1.inOut",
                });
            }
        });

        const initialize = async () => {
            await fetchUserInitial();
            await fetchNotificationCount();
        }

        initialize();

        return () => {
            unsubscribe();
            unsubscribeBack();
        };
    }, []);

    useEffect(() => {
        let tween: gsap.core.Tween | null = null;
        if (notificationCount > 0 && notificationRef.current) {
            tween =gsap.fromTo(
                notificationRef.current,
                { y: 5},
                { y: 0, duration: 0.7, yoyo:true, repeat: -1 }
            );
        }
        return () => {
            if (tween) {
                tween.kill();
            }
        };
    }, [notificationCount]);

    useEffect(() => {
        settingsOpenRef.current = settingsOpen;
    }, [settingsOpen]);

    useEffect(() => {
        // Animate iconref to change color and scale up from start position to full screen then open options page
        // All other elements should go away sideways during the animation
        if (iconRef.current && settingsOpen) {
            const iconRect = iconRef.current.getBoundingClientRect();
            const mainElement = document.querySelector("main");
            if (!mainElement) return;
            const containerRect = mainElement.getBoundingClientRect();
            const scaleX = containerRect.width / iconRect.width;
            const scaleY = containerRect.height / iconRect.height;
            const scale = Math.max(scaleX, scaleY);
            const x = containerRect.left + containerRect.width / 2 - (iconRect.left + iconRect.width / 2);
            const y = containerRect.top + containerRect.height / 2 - (iconRect.top + iconRect.height / 2);
            gsap.to(iconRef.current, {
                z: 100,
                x: x,
                y: y,
                scale: scale,
                borderRadius: 0,
                duration: animateAwayItemsDuration,
                backgroundColor: "#000",
                ease: "power1.inOut",
            });
        }
        if (iconRef.current && !settingsOpen) {
            gsap.to(iconRef.current, {
                x: 0,
                y: 0,
                scale: 1,
                borderRadius: "50%",
                duration: animateBackItemsDuration,
                backgroundColor: "",
                ease: "power1.inOut",
            });
        }
    }, [settingsOpen]);

    return (
        <nav ref={navRef} className="w-full flex items-center justify-between py-4">
            <ul className="flex items-center relative *:flex *:justify-center *:items-center *:rounded-full *:p-3 [&>li>*]:w-7">
                <li ref={iconRef} className={`bg-blue-500 ${settingsOpen ? "absolute inset-0 z-50" : ""}`} onClick={() => {optionsOpen()}}>
                    <p className="font-bold text-white aspect-square text-center text-lg">{usersFirstInitial}</p>
                </li>
                <li className="bg-white cursor-pointer absolute left-3/4">
                    <span>
                        <Plus className="text-black w-full h-full" />
                    </span>
                </li>
            </ul>

            <div className="p-3 bg-white rounded-full flex justify-center items-center cursor-pointer relative" onClick={() => notificationsOpen()}>
                <span className="w-7 aspect-square">
                    <Bell className="text-black w-full h-full" />
                </span>
                {notificationCount > 0 && (
                    <span
                    ref={notificationRef}
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 aspect-square flex items-center justify-center rounded-full transform"
                    >
                    {notificationCount}
                    </span>

                )}
            </div>
        </nav>
    );
}
export default PhoneNavbar;