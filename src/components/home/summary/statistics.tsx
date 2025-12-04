import { LucideIcon } from "lucide-react"


type StatisticProps = {
    Icon: LucideIcon;
    text: string;
    type: "good" | "bad" | "neutral";
}

/**
 * Render a compact pill-shaped statistic element with an optional icon and color styling based on `type`.
 *
 * @param Icon - Optional Lucide icon component to display before the text
 * @param text - Text content to display inside the pill
 * @param type - Visual variant: `"good"` applies green tones, `"bad"` applies red tones, `"neutral"` applies neutral tones
 * @returns A JSX element representing the styled statistic pill
 */
export default function Statistic({Icon, text, type}: StatisticProps) {

    return (
        <div className={`px-3 py-2 rounded-full text-sm text-white shadow-sm hover:scale-105 transition-transform flex justify-center items-center gap-1 select-none ${
            type === "good" ? "bg-green-800/50" :
            type === "bad" ? "bg-red-800/50" :
            "bg-neutral-800/50"
        }`}>
            {Icon && <Icon className={`inline w-4 h-4 ${
                type === "good" ? "text-green-400" :
                type === "bad" ? "text-red-400" :
                "text-neutral-400"
            }`} />}
            <p>{text}</p>
        </div>
    );
}