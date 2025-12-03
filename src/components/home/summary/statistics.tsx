import { LucideIcon } from "lucide-react"


type StatisticProps = {
    Icon: LucideIcon;
    text: string;
    type: "good" | "bad" | "neutral";
}

export default function Statistic({Icon, text, type}: StatisticProps) {

    return (
        <div className={`px-3 py-2 rounded-full text-sm text-white shadow-sm hover:scale-105 transition-transform flex justify-center items-center gap-1 select-none ${
            type === "good" ? "bg-green-800" :
            type === "bad" ? "bg-red-800" :
            "bg-neutral-800"
        }`}>
            {Icon && <Icon className={`inline w-4 h-4 mb-1 ${
                type === "good" ? "text-green-400" :
                type === "bad" ? "text-red-400" :
                "text-neutral-400"
            }`} />}
            <p>{text}</p>
        </div>
    );
}