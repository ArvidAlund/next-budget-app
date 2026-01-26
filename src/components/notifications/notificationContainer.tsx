import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Notification } from "@/app/lib/types";


const NotificationContainer = ({ notification, onClick }: { notification: Notification, onClick: () => void }) => {
    const dotRef = useRef<HTMLDivElement>(null);
    
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
        <li>
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