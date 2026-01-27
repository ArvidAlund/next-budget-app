import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Notification } from "@/app/lib/types";


const NotificationContainer = ({ notification, onClick, index }: { notification: Notification, onClick: () => void, index: number }) => {
    const dotRef = useRef<HTMLDivElement>(null);
    const liRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (liRef.current && index % 2 === 0) {
            gsap.fromTo(
                liRef.current,
                { opacity: 0, x: "100%" },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: index * 0.2 }
            );
        } else if (liRef.current && index % 2 !== 0) {
            gsap.fromTo(
                liRef.current,
                { opacity: 0, x: "-100%" },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: index * 0.2 }
            );
        }
    }, [index]);
    
    useEffect(() => {
        if (dotRef.current && !notification.read) {
            const animation = gsap.fromTo(dotRef.current,
                { scale: 1 },
                    {
                        scale: 1.5,
                        duration: 0.8,
                        ease: "power1.inOut",
                        yoyo: true,
                        repeat: -1,
                    }
            );
            return () => {
                animation.kill();
            };
        }
    }, [notification.read]);
    
    return (
        <li ref={liRef}>
            <div className={`p-4 rounded-lg shadow-md ${notification.read ? 'bg-gray-100' : `bg-white border-2 border-blue-500`} relative cursor-pointer`} onClick={onClick}>
                {notification.title && <h3 className="font-semibold mb-2 text-black">{notification.title}</h3>}
                <p className="text-gray-800 w-3/4">{notification.message}</p>
                <span className="text-xs text-gray-500">{new Date(notification.date).toLocaleDateString("sv-SE", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    {!notification.read && <span ref={dotRef} className={`ml-2 inline-block w-3 aspect-square ${notification.type == "warning" ? "bg-yellow-500" : notification.type == "error" ? "bg-red-500" : notification.type == "success" ? "bg-green-500" : "bg-blue-500"} rounded-full absolute top-1/2 right-8 -translate-y-1/2`}/>}
            </div>
        </li>
    );
}
export default NotificationContainer;