import { ArrowLeft } from "lucide-react";
import ImprovementConstainer from "./improvementContainer";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const tips = [
    {
        id: 1,
        title: "Sparande vanor",
        amount: 500,
    },
    {
        id: 2,
        title: "Prenumerationer",
        amount: 200,
    },
    {
        id: 3,
        title: "Onödiga utgifter",
        amount: 150,
    },
];

const ImproveModal = ({onClose}: {onClose: () => void}) => {
    const modalRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: '100%' },
                { opacity: 1, y: '0%', duration: 0.5, ease: "power2.out" }
            );
        }
    }, []);

    const handleClose = () => {
        if (modalRef.current) {
            gsap.to(
                modalRef.current,
                { opacity: 0, y: '100%', duration: 0.5, ease: "power2.in", onComplete: () => onClose() }
            );
        } else {
            onClose();
        }
    };

    return (
        <section ref={modalRef} className="absolute top-0 w-full h-full bg-linear-to-b from-[#8280FE] to-white z-50 overflow-x-hidden overflow-y-scroll no-scrollbar">
            <div className="flex justify-between items-center w-full mt-4 h-12">
                <button className="p-2 rounded-full" onClick={handleClose}>
                    <ArrowLeft size={24} />
                </button>
            </div>
            <div className="mt-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Förbättringstips</h2>
                <ul className="space-y-4">
                    {tips.map(tip => (
                        <ImprovementConstainer key={tip.id} data={tip} />
                    ))}
                </ul>
            </div>
        </section>
    );
}
export default ImproveModal;