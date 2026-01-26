import { ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import NotificationContainer from "./notificationContainer";
import getAllNotifications from "@/app/lib/db/notifications/getAllNotifications";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import { Notification } from "@/app/lib/types";

const orgNotifications = [
    {
        id: 1,
        message: "Din månatliga rapport är nu tillgänglig.",
        date: "2024-06-01",
        read: false,
        created_at: "2024-06-10T10:00:00Z",
    },
    {
        id: 2,
        message: "Nytt sparande tips har lagts till i din förbättringssektion.",
        date: "2024-06-03",
        read: true,
        created_at: "2024-06-10T10:00:00Z",
    },
    {
        id: 3,
        message: "Din balans har uppdaterats.",
        date: "2024-06-05",
        read: false,
        created_at: "2024-06-10T10:00:00Z",
    },
    {
        id: 4,
        message: "Påminnelse: Granska dina prenumerationer denna månad.",
        date: "2024-06-07",
        read: false,
        created_at: "2024-06-10T10:00:00Z",
    },
    {
        id: 5,
        message: "Du har sparat 1500 kr denna månad!",
        date: "2024-06-10",
        read: false,
        created_at: "2024-06-10T10:00:00Z",
    }
];

const NotificationModal = ({ onClose } : { onClose: (unreadCount: number) => void }) => {
    const [notificationsList, setNotificationsList] = useState<Notification[] | null>(orgNotifications);
    const [unreadCount, setUnreadCount] = useState<number>(orgNotifications.filter(n => !n.read).length);
    const modalRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: '100%' },
                { opacity: 1, y: '0%', duration: 0.5, ease: "power2.out" }
            );
        }

        const getNotifications = async () => {
            const user = await supabaseUserID();
            if (!user) return;
            try {
                const res = await getAllNotifications();
                if (!res) return;
                setNotificationsList(res);
                const unread = res.filter(n => !n.read).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        getNotifications();
    }, []);

    useEffect(() => {
        if (unreadCount === 0){
            setNotificationsList(prev => prev ? prev.map(n => ({ ...n, read: true })) : null);
        }
    }, [unreadCount]);

    const handleReadAll = () => {
        setNotificationsList(prev => prev ? prev.map(n => ({ ...n, read: true })) : null);
        setUnreadCount(0);
    }

    const handleClose = () => {
        if (modalRef.current) {
            gsap.to(
                modalRef.current,
                { opacity: 0, y: '100%', duration: 0.5, ease: "power2.in", onComplete: () => onClose(unreadCount) }
            );
        } else {
            onClose(unreadCount);
        }
    };

    return (
        <section ref={modalRef} className="absolute left-0 w-full h-full bg-linear-to-b from-[#8280FE] to-white z-50 rounded-3xl overflow-x-hidden overflow-y-scroll no-scrollbar">
            <div className="flex justify-between items-center w-full mt-4 h-12">
                <button className="p-2 rounded-full" onClick={handleClose}>
                    <ArrowLeft size={24} />
                </button>
                <h4>Notifikationer</h4>
            </div>
            <div className="flex justify-between items-center">
                <div className="px-4 mt-2">
                    <p className="text-gray-600 text-sm">Du har {notificationsList?.filter(n => !n.read).length} olästa notifikationer</p>
                </div>
                <button className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white text-[clamp(0.5rem,3vw,1rem)]" onClick={handleReadAll}>Markera som lästa</button>
            </div>
            <ul className="mt-8 px-4 space-y-4">
                {notificationsList?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((notification) => (
                    <NotificationContainer key={notification.id} notification={notification} onClick={() => {
                        if (!notification.read) {
                            setNotificationsList(prev => prev ? prev.map(n => 
                                n.id === notification.id ? { ...n, read: true } : n
                            ) : null);
                            setUnreadCount(prev => prev - 1);
                        }
                    }} />
                ))}
            </ul>
        </section>
    );
}
export default NotificationModal;