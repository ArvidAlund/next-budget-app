import { ArrowLeft } from "lucide-react";
import BalanceAnimation from "../ui/balanceAnimation";
import ImprovementConstainer from "./improvementContainer";

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
    return (
        <section className="">
            <div className="flex justify-between items-center w-full mt-4 h-12">
                <button className="p-2 rounded-full" onClick={() => onClose()}>
                    <ArrowLeft size={24} />
                </button>
            </div>
            <div className="w-full flex flex-col justify-center items-start mt-8 text-white">
                <p className="text-xs">Total balans</p>
                <h1 className="text-center w-full text-7xl mt-4 text-[#0B0748]"><BalanceAnimation end={12345} /> kr</h1>
            </div>
            <div className="mt-8 px-4">
                <h2 className="text-2xl font-bold mb-4">Förbättringstips</h2>
                <div className="space-y-4">
                    {tips.map(tip => (
                        <ImprovementConstainer key={tip.id} data={tip} />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default ImproveModal;