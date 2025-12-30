import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import NotificationContainer from "./notificationContainer";

const orgNotifications = [
    {
        id: 1,
        message: "Din månatliga rapport är nu tillgänglig.",
        date: "2024-06-01",
        read: false,
    },
    {
        id: 2,
        message: "Nytt sparande tips har lagts till i din förbättringssektion.",
        date: "2024-06-03",
        read: true,
    },
    {
        id: 3,
        message: "Din balans har uppdaterats.",
        date: "2024-06-05",
        read: false,
    },
    {
        id: 4,
        message: "Påminnelse: Granska dina prenumerationer denna månad.",
        date: "2024-06-07",
        read: false,
    },
    {
        id: 5,
        message: "Du har sparat 1500 kr denna månad!",
        date: "2024-06-10",
        read: false,
    }
];

const NotificationModal = ({ onClose } : { onClose: (unreadCount: number) => void }) => {
    const dotRef = useRef<HTMLDivElement>(null);
    const [notificationsList, setNotificationsList] = useState<typeof orgNotifications | null>(orgNotifications);
    const [unreadCount, setUnreadCount] = useState<number>(orgNotifications.filter(n => !n.read).length);

    useEffect(() => {
        if (unreadCount === 0){
            notificationsList?.forEach(n => n.read = true);
            setNotificationsList(notificationsList ? [...notificationsList] : null);
        }
        if (dotRef.current) {
            gsap.fromTo(dotRef.current,
                { scale: 1 },
                {
                    scale: 1.5,
                    duration: 0.8,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                }
            );
        }
    }, []);

    const handleReadAll = () => {
        notificationsList?.forEach(n => n.read = true);
        setNotificationsList(notificationsList ? [...notificationsList] : null);
        setUnreadCount(0);
    }

    return (
        <section>
            <div className="flex justify-between items-center w-full mt-4 h-12">
                <button className="p-2 rounded-full" onClick={() => onClose(unreadCount)}>
                    <ArrowLeft size={24} />
                </button>
                <h4>Notifikationer</h4>
            </div>
            <div className="flex justify-between items-center">
                <div className="px-4 mt-2">
                    <p className="text-gray-600 text-sm">Du har {notificationsList?.filter(n => !n.read).length} olästa notifikationer</p>
                </div>
                <button className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white" onClick={handleReadAll}>Markera som lästa</button>
            </div>
            <ul className="mt-8 px-4 space-y-4">
                {notificationsList?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((notification) => (
                    <NotificationContainer key={notification.id} notification={notification} onClick={() => {
                        if (!notification.read) {
                            notification.read = true;
                            setNotificationsList(notificationsList ? [...notificationsList] : null);
                            setUnreadCount(prev => prev - 1);
                        }
                    }} />
                ))}
            </ul>
        </section>
    );
}
export default NotificationModal;