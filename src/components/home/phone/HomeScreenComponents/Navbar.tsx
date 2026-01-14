import { Bell, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import supabase from "@/app/lib/supabaseClient";
import gsap from "gsap";




const PhoneNavbar = () => {
    const [openNotification, setOpenNotification] = useState(false);
    const notificationCount = 3; // Example notification count
    const [usersFirstInitial, setUsersFirstInitial] = useState<string | null>(null);
    const notificationRef = useRef<HTMLSpanElement>(null);
    const navRef = useRef<HTMLElement>(null);

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
        fetchUserInitial();

        if (notificationCount > 0 && notificationRef.current) {
            gsap.fromTo(notificationRef.current,
                { y: 5 },
                { y: 0, duration: 0.7, yoyo: true, repeat: -1 }
            );
        }
        if (navRef.current) {
            gsap.fromTo(
                navRef.current,
                { opacity: 0, y: '-100%' },
                { opacity: 1, y: '0%', duration: 0.5, ease: "power2.out", delay: 0.2 }
            );
        }
    }, []);

    return (
        <nav ref={navRef} className="w-full flex items-center justify-between py-4">
            <ul className="flex items-center relative *:flex *:justify-center *:items-center *:rounded-full *:p-3 [&>li>*]:w-7">
                <li className="bg-blue-500">
                    <p className="font-bold text-white aspect-square text-center text-lg">{usersFirstInitial}</p>
                </li>
                <li className="bg-white cursor-pointer absolute left-3/4">
                    <span>
                        <Plus className="text-black w-full h-full" />
                    </span>
                </li>
            </ul>

            <div className="p-3 bg-white rounded-full flex justify-center items-center cursor-pointer relative" onClick={() => setOpenNotification(!openNotification)}>
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