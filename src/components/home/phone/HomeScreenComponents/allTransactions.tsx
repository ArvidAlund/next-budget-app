import { TransactionTable } from "@/app/transactions/TransactionTable";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { animateAwayItemsDuration, animateBackItemsDuration } from "@/app/lib/globalSettings";

const AllTransactions = ({ onClose } : { onClose: () => void }) => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: '100%' },
                { opacity: 1, y: '0%', duration: animateAwayItemsDuration, ease: "power2.out" }
            );
        }
    }, []);

    const handleClose = () => {
        if (containerRef.current) {
            gsap.to(
                containerRef.current,
                { y: '100%', duration: animateBackItemsDuration, ease: "power2.in", onComplete: () => onClose() }
            );
        } else {
            onClose();
        }
    };
    return (
        <section ref={containerRef} className="absolute top-0 left-0 w-full h-full bg-black z-50 overflow-x-hidden overflow-y-scroll no-scrollbar">
                <div className="flex justify-between items-center w-full h-12 mb-2">
                    <button className="p-2 bg-black/10 rounded-full" onClick={handleClose}>
                        <ArrowLeft size={24} />
                    </button>
                    <h5>Alla transaktioner</h5>
                </div>
                <TransactionTable />
              </section>
    );
}
export default AllTransactions;